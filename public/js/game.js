const GRID_SIZE = 20;
let applePosition = {};
let snakeArray = [];
let numberOfApplesEaten = 0;
/**
 * Game state variable, toggled to play or pause the game
 * By default, game is running
 */
let isGameRunning = true;
/**
 * At the start, make the snake move to the right
 */
let direction = {
    x: 1,
    y: 0
}

const gameBoard = document.getElementById('gameBoard');
const scoreSpan = document.getElementById('score');

function getApplePosition(snakeArray){
    let position = {};

    while(true){
        position = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        }

        let overlaps = false;
        snakeArray.forEach(segment => {
            if(segment.x === position.x && segment.y === position.y){
                overlaps = true;
            }
        });

        if(!overlaps){
            break;
        }
    }
   
    return position;
}

/**
 * Generate the checkered game board with 30 X 30 pixel squares
 */
function drawBoard() {
    //Reset the board
    gameBoard.innerHTML = '';

    for(let i = 0; i < 400; i++){
        const x = i % 20; //Choose column
        const y = Math.floor(i / 20); //Choose row
        
        const square = document.createElement('div');
        square.classList.add('w-7.5', 'h-7.5');

        square.style.gridRowStart = y + 1;
        square.style.gridColumnStart = x + 1;

        if(y % 2 === i % 2){
            square.classList.add('bg-custom-green-dark');
        } else {
            square.classList.add('bg-custom-green-light');
        }

        // Place the snake
        snakeArray.forEach(segment => {
            if(segment.x === x && segment.y === y){
                //console.log("Snake " + x + " " + y);
                square.classList.add('bg-custom-green-snake'); // Color for the snake
            }
        });

        // Place the apple
        if (applePosition.x === x && applePosition.y === y) {
            const appleImage = document.createElement('img');
            appleImage.src = '../images/apple-image.svg';
            appleImage.alt = 'An apple';
            square.appendChild(appleImage);
        }

        gameBoard.appendChild(square);
    }
}

/**
 * Snake always starts from the center and is made up of only one square
 */
function initializeSnakeArray(){
    snakeArray = [
        {
            x: 10,
            y: 10
        }, 
        {
            x: 9,
            y: 10
        }, 
        {
            x: 8,
            y: 10
        }, 
        {
            x: 7,
            y: 10
        }, 
    ];
}

function changeScore(){
    scoreSpan.innerHTML = numberOfApplesEaten;
}

function checkForCollision(){
    const head = snakeArray[0];
    for(let i = 1; i < snakeArray.length; i++){
        let segment = snakeArray[i];
        if(head.x === segment.x && head.y === segment.y){
           isGameRunning = false;
           console.log('Game over');
           window.location.href = '/gameOver';
        }
    }
}

function moveSnake(){
    const currentHead = snakeArray[0];
   
    /**
     * Modulus with GRID_SIZE to make the snake move through the boundaries
     */
    const newHead = {
        x: (currentHead.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (currentHead.y + direction.y + GRID_SIZE) % GRID_SIZE
    }

    

    /**
     * Check if Snake ate the apple, if yes - 
     * 1. Add the new head to the snakes body
     * 2. Do not remove the snake's tail segment (the snake's length increases)
     * 3. Get a new apple position
     * 4. Increase the apple count
     */
    if(newHead.x === applePosition.x && newHead.y === applePosition.y){
        snakeArray.unshift(newHead);
        applePosition = getApplePosition(snakeArray);
        numberOfApplesEaten++
        changeScore();
    } else {
        /**
         * If Snake doesn't eat the apple, 
         * then append new head at the top and remove the segment from the tail
         */
        snakeArray.unshift(newHead);
        snakeArray.pop();

        /**
            * Check if the snake's head collided with its own body
        */
        checkForCollision();
    }

    drawBoard();
}

/**
 * To update the game state repeatedly
 */
function gameLoop(){
    if(!isGameRunning){
        return;
    }

    setTimeout(() => {
        moveSnake();
        gameLoop();
    }, 200);
}

function initialize() {
    initializeSnakeArray();
    applePosition = getApplePosition(snakeArray);
    gameLoop();
};

window.onload = initialize;

function changeDirection(x, y){
    direction.x = x;
    direction.y = y;
}

/**
 * Event Listener for the arrow keys
 */
document.addEventListener('keydown', event => {
    console.log(event);
    switch(event.key) {
        case 'ArrowUp':
            if(direction.y === 0){ //ArrowUp should be allowed only when the snake is currently moving in the horizontal axis
                changeDirection(0, -1);
            }

            break;
        case 'ArrowDown':
            if(direction.y === 0){ //ArrowUp should be allowed only when the snake is currently moving in the horizontal axis
                changeDirection(0, 1);
            }

            break;
        case 'ArrowLeft':
            if(direction.x === 0){ //ArrowLeft should be allowed only when the snake is currently moving in the vertical axis
                changeDirection(-1, 0);
            }

            break;
        case 'ArrowRight':
            if(direction.x === 0){ //ArrowRight should be allowed only when the snake is currently moving in the vertical axis
                changeDirection(1, 0);
            }

            break; 
        case ' ': //Spacebar to play or pause the game
            isGameRunning = !isGameRunning;

            if(isGameRunning){
                gameLoop();
            }

            break;
    }
});
