const hangmanImage = document.getElementById('hangman-img');
const wordGuessesContainer = document.getElementById('word-guesses');
const gameStatusContainer = document.getElementById('game-status');
const keyboardContainer = document.getElementById('keyboard');
const keyButtons = document.querySelectorAll('#keyboard .key');

const chosenWord = "chimpanzee";
const maximumGuesses = 10;
let guessesLeft = 10;
let displayWordArray = [];
let isGameFinished = false;

function initializeGame() {
    guessesLeft = maximumGuesses;

    for (let i = 0; i < chosenWord.length; i++) {
        displayWordArray.push('_');
    }

    hangmanImage.src = 'img/h-0.jpg';

    let displayWordString = '';
    for (let i = 0; i < displayWordArray.length; i++) {
        displayWordString += displayWordArray[i];
    }
    wordGuessesContainer.textContent = displayWordString;
    gameStatusContainer.textContent = `Guesses remaining: ${guessesLeft}`;
}

function checkWin() {
    if (!displayWordArray.includes('_')) {
        gameStatusContainer.textContent = "You Win! 🎉";
        isGameFinished = true;
    }
}

function checkLoss() {
    if (guessesLeft <= 0) {
        gameStatusContainer.textContent = `You Lose! 💩 The word was: ${chosenWord}`;
        isGameFinished = true;
    }
}

function userGuess(event) {
    if (isGameFinished) {
        return;
    }

    const clickedButton = event.target;
    const guessedLetter = clickedButton.textContent.toLowerCase();

    if (chosenWord.toLowerCase().includes(guessedLetter)) {

        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord.toLowerCase()[i] === guessedLetter) {
                 if (displayWordArray[i] === '_') {
                     displayWordArray[i] = chosenWord[i];
                 }
            }
        }

        let displayWordString = '';
        for (let i = 0; i < displayWordArray.length; i++) {
            displayWordString += displayWordArray[i];
        }
        wordGuessesContainer.textContent = displayWordString;

        checkWin();

    } else {
        guessesLeft--;

        let imageIndex = maximumGuesses - guessesLeft;
        if (imageIndex <= 10) {
             hangmanImage.src = `img/h-${imageIndex}.jpg`;
        }

        gameStatusContainer.textContent = `Incorrect! Guesses remaining: ${guessesLeft}`;

        checkLoss();
    }
}

keyButtons.forEach(button => {
    button.addEventListener('click', userGuess);
});

initializeGame();