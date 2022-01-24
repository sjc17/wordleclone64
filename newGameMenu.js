document.querySelector('#inputButton').addEventListener('click', event => {
    startGame(document.querySelector('#inputNumber').value);
    document.querySelector('#menu').classList.add('hidden');    
});

document.querySelector('#startNewGame').addEventListener('click', event => {
    document.querySelector('#menu').classList.toggle('hidden');
});