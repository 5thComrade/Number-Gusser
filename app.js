let winningNum = getWinningNum(),
    guessesLeft = 3;

const form = document.getElementById('main-form');
const number = document.getElementById('number');
const result = document.querySelector('.result');
const guessBtn = document.getElementById('guess-btn');

//Play Again Event Listener
form.addEventListener('click', function(e) {
    if(e.target.classList.contains('play-again')) {
        window.location.reload();
    }
})

form.addEventListener('submit', function(e) {
    let guess = parseInt(number.value);
    if(isNaN(guess) || guess < 1 || guess > 10) {
        setMessage('Please enter a number between 1 and 10', 'text-danger');
    } else if(guess === winningNum) {
        gameOver(true, `${winningNum} is correct. YOU WIN!`);
    } else {
        guessesLeft -= 1;
        if(guessesLeft === 0) {
            //Game Over Lost
            gameOver(false, `Game Over. You Lost. The correct number was ${winningNum}`);
        } else {
            //Game continues - wrong guess
            number.className = 'border border-danger form-control';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'text-danger');
            number.value = '';
        }
    }
    e.preventDefault();
})

function gameOver(won, msg) {
    let color;
    let text;
    won === true ? color = 'border border-success form-control' : color = 'border border-danger form-control';
    won === true ? text = 'text-success' : text = 'text-danger';
    number.disabled = true;
    number.className = color;
    setMessage(msg, text);

    //Plat Again
    guessBtn.value = 'Play Again';
    guessBtn.className = 'btn btn-block border-dark my-3 play-again';
}

function setMessage(msg, color) {
    result.className = color;
    result.textContent = msg;
}

function getWinningNum() {
    let num = Math.floor(Math.random() * 10) + 1;
    return num;
}