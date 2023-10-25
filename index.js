let board;
let boardWidth = 450;
let boardHeight = 570;
let context;

window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");
}