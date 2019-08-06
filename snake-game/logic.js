

var canvasX = 0, canvasY = 0;
var canvasWidth = 800, canvasHeight = 620;
var canvasPaddindLeft = 9, canvasPaddindTop = 10;
var canvasBaseColor = 'black'

var ballX = 60 + canvasPaddindLeft, ballY = 100 + canvasPaddindTop;
var ballRadius = 10;
var ballColor = 'red';

var snakeCoordsArr = [];
var snakeHeadPositionX = 400 + canvasPaddindLeft;
var snakeHeadPositionY = 300 + canvasPaddindTop;
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


    // support animation
    initialiseSnakeArray();
    startGame();

}

function firstRacketMovement() {
    var mousePosition = calculateMousePosition(event);
    var mousePositionY = mousePosition.y;
    racket1Y = mousePositionY - racketHeight / 2;
}

function calculateMousePosition(event) {
    var rectangle = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rectangle.left - root.scrollLeft;
    var mouseY = event.clientY - rectangle.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    }
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
    console.log(event)
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

    console.log(event)
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
    console.log("Reset")
}


/* --------------------- code for moving ball ------------------------ */
function move() {

    switch (snakeDirection) {
        case 'UP':
            shiftSnakeCoordsArrRight();
            snakeHeadPositionY -= snakePerUnitLength;
            snakeCoordsArr[0] = new Coordinates(snakeHeadPositionX, snakeHeadPositionY);
            break;
        case 'RIGHT':
            shiftSnakeCoordsArrRight();
            snakeHeadPositionX += snakePerUnitWidth;
            snakeCoordsArr[0] = new Coordinates(snakeHeadPositionX, snakeHeadPositionY);
            break;
        case 'DOWN':
            shiftSnakeCoordsArrRight();
            snakeHeadPositionY += snakePerUnitLength;
            snakeCoordsArr[0] = new Coordinates(snakeHeadPositionX, snakeHeadPositionY);
            break;
        case 'LEFT':
            shiftSnakeCoordsArrRight();
            snakeHeadPositionX -= snakePerUnitWidth;
            snakeCoordsArr[0] = new Coordinates(snakeHeadPositionX, snakeHeadPositionY);
            break;
    }
}

function shiftSnakeCoordsArrRight() {
    for (var i = snakeLength - 1; i > 0; i--) {
        snakeCoordsArr[i] = snakeCoordsArr[i - 1];
    }
}






/* --------------------- code for drawing ------------------------ */

function draw() {


    // draw base canvas
    canvasContext.fillStyle = canvasBaseColor;
    canvasContext.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);

    // draw ball
    canvasContext.fillStyle = ballColor;
    canvasContext.beginPath();                      // since there is no fillArc method
    canvasContext.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI, true);
    canvasContext.fill();

    // draw snake
    canvasContext.fillStyle = snakeColor;
    for (var i = 0; i < snakeLength; i++) {
        canvasContext.beginPath();                      // since there is no fillArc method
        canvasContext.arc(snakeCoordsArr[i].X, snakeCoordsArr[i].Y, ballRadius, 0, 2 * Math.PI, true);
        canvasContext.fill();
    }
}





