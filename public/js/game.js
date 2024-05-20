window.onload = function() {
    const gameBoard = document.getElementById('gameBoard');

    for(let i = 0; i < 400; i++){
        const square = document.createElement('div');
        square.classList.add('w-7.5', 'h-7.5');

        if(Math.floor(i / 20) % 2 === i % 2){
            square.classList.add('bg-custom-green-square-dark');
        } else {
            square.classList.add('bg-custom-green-square-light');
        }

        gameBoard.appendChild(square);
    }
};