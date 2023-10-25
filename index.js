//  Board det up
let board;
let boardWidth = 450;
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
let pipeWidth = 120;
let pipeHeight = 450;
let pipeX = boardWidth;
let pipeY = 0;
let pipeUpperImg;
let pipeLowerImg;

// Physics to move pipes left so that it make us feel that bird is moving towards right
let velocityX = -2; // As moving left so in negative



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

}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0 , 0, board.width, board.height);

    // birds
    context.drawImage(birdImg, bird.x, bird.y, bird.width,bird.height);

    // pipes
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width,pipe.height);
    }
}

function placePipes(){
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2.3);
    let openingSpace = board.height / 5;

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