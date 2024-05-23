const GRID_SIZE = 20;
let applePosition = {};
let snakeArray = [];
let numberOfApplesEaten;
let timeElapsedInSeconds;
let timeInterval = null;
const speeds = {
    1: 500, // Slowest speed, update every 500 milliseconds
    2: 400,
    3: 300,
    4: 250,
    5: 200,
    6: 150,
    7: 100,
    8: 50   // Fastest speed, update every 50 milliseconds
};

const defaultSpeed = 3; //Default speed
let currentSpeed; 
/**
 * Game state variable, toggled to play or pause the game
 * By default, game is running
 */
let isGameRunning = true;
let isGameOver = false;
/**
 * At the start, make the snake move to the right
 */
let direction;

function initializeDirection(){
    return {
        x: 1,
        y: 0
    };
}

const game = document.getElementById('game');
const gameBoard = document.getElementById('gameBoard');
const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('timer');
const speedModeSpan = document.getElementById('speedMode');
const popup = document.getElementById('popup');
const finalScoreSpan = document.getElementById('finalScore');
const finalTimeSpan = document.getElementById('finalTime');

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
                const snakeBody = document.createElement('div');
                snakeBody.classList.add('w-full', 'h-full', 'bg-custom-green-snake', 'rounded-full', 'border', 'border-black');
                square.appendChild(snakeBody);
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
    return [
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
        {
            x: 6,
            y: 10
        }, 
        {
            x: 5,
            y: 10
        }, 
        {
            x: 4,
            y: 10
        }, 
        {
            x: 3,
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
        
           finalScoreSpan.innerHTML = numberOfApplesEaten;
           finalTimeSpan.innerHTML = timerSpan.innerHTML;
           popup.style.display = 'flex';
           game.style.display = 'none';
           snakeArray = [];
           drawBoard();
           isGameOver = true;
           console.log('Game over');
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

function startTimer(){
    if(!timeInterval){
        timeInterval = setInterval(() => {
            timeElapsedInSeconds++;
            displayTime();
        }, 1000);
    }
}

function pauseTimer(){
    if(timeInterval !== null){
        clearInterval(timeInterval);
        timeInterval = null;
    }
}

function displayTime(){
    const minutes = Math.floor(timeElapsedInSeconds / 60);
    const seconds = timeElapsedInSeconds % 60;

    timerSpan.innerHTML = `${padTime(minutes)}:${padTime(seconds)}`;
}

// Helper function to pad the time values with leading zeros
function padTime(time) {
    return time.toString().padStart(2, '0');
}

/**
 * To update the game state repeatedly
 */
function gameLoop(){
    if(!isGameRunning){
        pauseTimer();
        return;
    }

    setTimeout(() => {
        startTimer();
        moveSnake();
        gameLoop();
    }, speeds[currentSpeed]);
}

function initialize() {
    isGameRunning = true;
    isGameOver = false;
    game.style.display = 'flex';
    popup.style.display = 'none';
    snakeArray = initializeSnakeArray();
    currentSpeed = defaultSpeed;
    numberOfApplesEaten = 0;
    timeElapsedInSeconds = 0;
    timeInterval = null;
    changeSpeed(currentSpeed);
    direction = initializeDirection();
    applePosition = getApplePosition(snakeArray);
    gameLoop();
};

window.onload = initialize;

function changeDirection(x, y){
    direction.x = x;
    direction.y = y;
}

function changeSpeed(key){
    currentSpeed = key;
    speedModeSpan.innerHTML = currentSpeed;
}

/**
 * Event Listener for the arrow keys, spacebar and the numbers for changing the speeds
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
        case 'r':
            if(isGameOver){
                console.log('R is pressed');
                initialize();
            }
            
            break;
        case '1':
        case '2': 
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            changeSpeed(event.key);
            break;
    }
});
