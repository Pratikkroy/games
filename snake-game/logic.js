

var canvasX = 0, canvasY = 0;
var canvasWidth = 800, canvasHeight = 620;
var canvasBaseColor = 'black'

const TIME_INTERVAL = 1000/30;  // milliseconds


/* ------------------------------- start of code ------------------------ */
window.onload = main;

function main () {

    document.addEventListener('keypress', stop);
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    

    // support animation
    startGame();
    
    document.addEventListener('mousemove',firstRacketMovement);

}

function startGame() {
    refreshIntervalId = setInterval( function() {
        move();
        draw();
    }, TIME_INTERVAL);
}

function stop(event){

    
    if(event.code === "Space") {
        if(isGameStopped){
            startGame();
        }
        else {
            clearInterval(refreshIntervalId);
        }  
        isGameStopped = !isGameStopped;
    }
    
    if(event.code === "KeyR"){
        // clearInterval(refreshIntervalId);
        // resetGame();
        // resetBallPosition();
        // startGame();
        console.log("R presssed")
    }
}

function resetGame(){
    console.log("Reset")
}


/* --------------------- code for moving ball ------------------------ */
function move() {
    
}





/* --------------------- code for drawing ------------------------ */

function draw() {

    
    // draw base canvas
    canvasContext.fillStyle = canvasBaseColor;
    canvasContext.fillRect(canvasX, canvasY, canvasWidth, canvasHeight);
    
    drawNet();

    // draw tennis racket
    canvasContext.fillStyle = racketColor;

    // draw left tennis racket
    canvasContext.fillRect(canvasX, racket1Y, racketWidth, racketHeight);
  
    // draw right tennis racket
    canvasContext.fillRect(canvasX+canvasWidth-racketWidth, racket2Y , racketWidth, racketHeight);
  
    // draw ball
    canvasContext.fillStyle = ballColor;
    var ballCenterX = ballX + ballRadius;
    var ballCenterY = ballY + ballRadius;
    canvasContext.beginPath();                      // since there is no fillArc method
    canvasContext.arc(ballCenterX, ballCenterY, ballRadius, 0, 2*Math.PI, true);
    canvasContext.fill();
    

    canvasContext.fillStyle = 'white';
    canvasContext.fillText(player1Score,canvasX+100,100);
    canvasContext.fillText(player2Score,canvasX+canvasWidth-100,100);
}





