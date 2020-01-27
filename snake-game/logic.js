

var canvasX = 0, canvasY = 0;
var canvasWidth = 800, canvasHeight = 620;
var canvasPaddingLeft = 10, canvasPaddingTop = 10;
var canvasBaseColor = 'black'

var ballX = 60 + canvasPaddingLeft, ballY = 100 + canvasPaddingTop;
var ballCoordinates;
var oldBallCoordinates = [];
var ballRadius = 10;
var ballColor = 'red';

var snakeCoordsArr = [];
var snakeHeadPositionX = 400 + canvasPaddingLeft;
var snakeHeadPositionY = 300 + canvasPaddingTop;
var snakeLength = 5;
var snakePerUnitLength = 2 * ballRadius;
var snakePerUnitWidth = 2 * ballRadius;
var snakeDirection = 'LEFT'
var snakeColor = 'green';

const TIME_INTERVAL = 1000 / 10;  // milliseconds

var canvas;   // info of dimension of the play area
var canvasContext;   // graphical info of the play area
var refreshIntervalId;  // used to stop the interval function
var isGameStopped = false;
var playerScore = 0;


/* ------------------------------- start of code ------------------------ */
window.onload = main;

class Coordinates {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
}
function main() {
    // document.addEventListener('mousemove', function (event) {
    //     console.log(event.clientX, event.clientY)
    // });
    document.addEventListener('keypress', keyPress);
    document.onkeydown = keyDown;
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // initialise the ball Coordinates
    ballCoordinates = new Coordinates(ballX, ballY);

    // support animation
    initialiseSnakeArray();
    startGame();

}

function initialiseSnakeArray() {

    var x = snakeHeadPositionX;
    var y = snakeHeadPositionY;

    for (var i = 0; i < snakeLength; i++) {
        snakeCoordsArr.push(new Coordinates(x, y));
        x += snakePerUnitWidth;
    }
}

function startGame() {
    refreshIntervalId = setInterval(function () {
        move();
        draw();
    }, TIME_INTERVAL);
}

function keyDown(event) {
    // console.log(event)
    if (!isGameStopped) {
        switch (event.code) {
            case 'ArrowUp':
                if (snakeDirection != 'DOWN')
                    snakeDirection = 'UP';
                break;
            case 'ArrowRight':
                if (snakeDirection != 'LEFT')
                    snakeDirection = 'RIGHT';
                break;
            case 'ArrowDown':
                if (snakeDirection != 'UP')
                    snakeDirection = 'DOWN';
                break;
            case 'ArrowLeft':
                if (snakeDirection != 'RIGHT')
                    snakeDirection = 'LEFT';
                break;
        }
    }
}

function keyPress(event) {

    // console.log(event)
    if (event.code === "Space") {
        if (isGameStopped) {
            startGame();
        }
        else {
            clearInterval(refreshIntervalId);
        }
        isGameStopped = !isGameStopped;
    }

    if (event.code === "KeyR") {
        // clearInterval(refreshIntervalId);
        // resetGame();
        // resetBallPosition();
        // startGame();
        console.log("R presssed")
    }
}

function resetGame() {
    console.log("Reset");


}

function stopGame() {
    isGameStopped = true;
    clearInterval(refreshIntervalId);
}

/* --------------------- code for moving snake ------------------------ */
function move() {

    // check if the snake hit the boundary or itself.
    if(checkIfSnakeHitTheBoundary() || checkIfSnakeHitItself()){
        stopGame();
    }
    
    // move snake one step forward
    shiftSnakeCoordsArrRight();
    switch (snakeDirection) {
        case 'UP':
            snakeHeadPositionY -= snakePerUnitLength;
            break;
        case 'RIGHT':
            snakeHeadPositionX += snakePerUnitWidth;
            break;
        case 'DOWN':
            snakeHeadPositionY += snakePerUnitLength;
            break;
        case 'LEFT':
            snakeHeadPositionX -= snakePerUnitWidth;
            break;
    }
    snakeCoordsArr[0] = new Coordinates(snakeHeadPositionX, snakeHeadPositionY);

    // check if snake hits the ball 
    // if yes place ball at new place and increase the snake length
    if(checkIfSnakeHitTheBall()){
        oldBallCoordinates.push(ballCoordinates);
        ballCoordinates = calculateNewPositionOfBall();
        playerScore += 1;
        // snakeCoordsArr.push(new Coordinates(oldBallCoordinates.X, oldBallCoordinates.Y));
        // snakeLength += 1;
    }

    if(oldBallCoordinates.length>0 && snakeCoordsArr[snakeLength-1].X == oldBallCoordinates[0].X && snakeCoordsArr[snakeLength-1].Y == oldBallCoordinates[0].Y){
        snakeCoordsArr.push(new Coordinates(oldBallCoordinates[0].X, oldBallCoordinates[0].Y));
        snakeLength += 1;
        oldBallCoordinates.shift();
    }
}

function shiftSnakeCoordsArrRight() {
    for (var i = snakeLength - 1; i > 0; i--) {
        snakeCoordsArr[i] = snakeCoordsArr[i - 1];
    }
}

function checkIfSnakeHitTheBoundary(){
    if(snakeCoordsArr[0].X<canvasPaddingLeft 
        || snakeCoordsArr[0].X>=canvasPaddingLeft + canvasWidth
        || snakeCoordsArr[0].Y<canvasPaddingTop
        || snakeCoordsArr[0].Y>=canvasPaddingTop + canvasHeight){
        return true;
    }
    return false;
}

function checkIfSnakeHitItself(){
    for(var i=1; i <= snakeLength-1; i++){
        if(snakeCoordsArr[0].X == snakeCoordsArr[i].X 
            && snakeCoordsArr[0].Y == snakeCoordsArr[i].Y){
                return true;
            }            
    }
    return false;
}

function checkIfSnakeHitTheBall(){
    if(snakeCoordsArr[0].X == ballCoordinates.X && snakeCoordsArr[0].Y == ballCoordinates.Y){
        return true;
    }
    return false;
}

function calculateNewPositionOfBall(){
    do{
        var newBallCoordinatesX = getRandomIntegerNumber(canvasPaddingLeft, canvasPaddingLeft+canvasWidth);
        var newBallCoordinatesY = getRandomIntegerNumber(canvasPaddingTop, canvasPaddingTop+canvasHeight);
    }while(checkNewBallPosition(newBallCoordinatesX, newBallCoordinatesY));
    
    return new Coordinates(newBallCoordinatesX, newBallCoordinatesY);
}

function getRandomIntegerNumber(min, max){ 
    var ballSquareDimension = 2* ballRadius;
    return min + Math.floor(Math.random()*((max-min)/ballSquareDimension))*ballSquareDimension;
}

function checkNewBallPosition(newBallCoordinatesX, newBallCoordinatesY){

    // check if new ball position is on the previous position
    if(ballCoordinates.X == newBallCoordinatesX && ballCoordinates.Y == newBallCoordinatesY){
        return true;
    }

    // check if new ball position is on the snake
    for(var i = 0; i < snakeLength; i++){
        if(newBallCoordinatesX == snakeCoordsArr[i].X && newBallCoordinatesY == snakeCoordsArr[i].Y){
            return true;
        }
    }

    // check if new ball position is out of canvas
    if(newBallCoordinatesX<canvasPaddingLeft 
        || newBallCoordinatesX>=canvasPaddingLeft + canvasWidth
        || newBallCoordinatesY<canvasPaddingTop
        || newBallCoordinatesY>=canvasPaddingTop + canvasHeight){
        return true;
    }

    return false;
}

/* --------------------- code for drawing ------------------------ */

function draw() {


    // draw base canvas
    canvasContext.fillStyle = canvasBaseColor;
    canvasContext.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);

    // draw ball
    canvasContext.fillStyle = ballColor;
    canvasContext.beginPath();                      // since there is no fillArc method
    canvasContext.arc(ballCoordinates.X, ballCoordinates.Y, ballRadius, 0, 2 * Math.PI, true);
    canvasContext.fill();

    // draw snake
    canvasContext.fillStyle = snakeColor;
    for (var i = 0; i < snakeLength; i++) {
        canvasContext.beginPath();                      // since there is no fillArc method
        canvasContext.arc(snakeCoordsArr[i].X, snakeCoordsArr[i].Y, ballRadius, 0, 2 * Math.PI, true);
        canvasContext.fill();
    }

    // show score 
    document.getElementById("score").innerHTML = playerScore;

    // canvasContext.fillStyle = 'white';
    // canvasContext.fillText(playerScore,canvasX+100,100);
}





