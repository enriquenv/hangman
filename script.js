const hangmanImage = document.getElementById('hangman-img');
const wordGuessesContainer = document.getElementById('word-guesses');
const gameStatusContainer = document.getElementById('game-status');

const chosenWord = "apple";
const maximumGuesses = 10;
let guessesLeft = 10;

function initializeGame() {
    hangmanImage.src = 'img/h-0.jpg';

    let displayString = "";
    for (let i = 0; i < chosenWord.length; i++) {
        displayString += "_";
    }
    wordGuessesContainer.textContent = displayString;
    gameStatusContainer.textContent = `Guesses remaining: ${maximumGuesses}`;
}

initializeGame();