/**
 * On pressing spacebar, change the endpoint to /game to render the game.html page
 */
document.addEventListener('keydown', function(event){
    if(event.code === 'Space'){
        window.location.href = '/game';
    }
});