//  Board det up
let board;
let boardWidth = 400;
let boardHeight = 570; 
let context;

// Bird set up
let birdWidth = 45;
let birdHeight = 35;
let birdX = boardWidth / 9;
let birdY = boardHeight / 2.25;

// bird object
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

// Pipes set up
let pipeArray = [];
let pipeWidth = 70;
let pipeHeight = 390;
let pipeX = boardWidth;
let pipeY = 0;
let pipeUpperImg;
let pipeLowerImg;

// Physics to move pipes left so that it make us feel that bird is moving towards right
let velocityX = -2; // As moving left so in negative
let velocityY = 0; //Bird jump speed
let gravity = 0.3; // Gravity to pull bird down

let gameOver = false;
let score = 0;


window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // draw flappy bird
    // context.fillStyle = "red";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    // load bird image
    birdImg = new Image();
    birdImg.src = "./bird.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width,bird.height);
    }

    // Pipe loading

    pipeUpperImg = new Image();
    pipeUpperImg.src = "./pipeUpper.png";

    pipeLowerImg = new Image();
    pipeLowerImg.src = "./pipeLower.png";


    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", jumpBird);

}

function update(){
    if(gameOver){
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0 , 0, board.width, board.height);

    // birds
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width,bird.height);

    if(bird.y > board.height){
        gameOver = true;
    }

    // pipes
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width,pipe.height);

        // check the bird passed the pipe
        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;
            pipe.passed = true;
        }

        if(detectCollision(bird, pipe)){
            gameOver = true;
        }
    }

    // clear pipes
    if(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift();
    }

    // Score
    
    // context.fillStyle = "#320bf1";
    context.fillStyle = "#f94007"
    context.font = "3.5rem sans-serif";
    context.fillText(score, 10, 50);

    if(gameOver){
        context.fillStyle = "#ff0048";
        context.fillText("Game Over!", 50, 270);
    }
    
}

function placePipes(){

    if(gameOver){
        return;
    }
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2.3);
    let openingSpace = board.height / 3;

    let topPipe = {
        img : pipeUpperImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img : pipeLowerImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(bottomPipe);

}

function jumpBird(e){
    if(e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX"){
        velocityY = -6;
    }

}

function detectCollision(b,p){
    return b.x < p.x + p.width &&
           b.x + b.width > p.x &&
           b.y < p.y + p.height &&
           b.y + b.height > p.y;
}