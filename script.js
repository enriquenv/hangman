const hangmanImage = document.getElementById('hangman-img');
const wordGuessesContainer = document.getElementById('word-guesses');
const gameStatusContainer = document.getElementById('game-status');
const keyboardContainer = document.getElementById('keyboard');
const keyButtons = document.querySelectorAll('#keyboard .key');
const resetButton = document.getElementById('reset-button');

let chosenWord = "";
const maximumGuesses = 10;
let guessesLeft;
let displayWordArray;
let isGameFinished;

const wordBank = [
    "apple",
    "banana",
    "orange",
    "grape",
    "kiwi",
    "pear",
    "peach",
    "plum",
    "melon",
    "lemon",
    "pineapple",
    "mango",
    "papaya",
    "coconut",
    "strawberry",
    "blueberry",
    "raspberry",
    "blackberry",
    "cherry",
    "apricot",
    "tomato",
    "carrot",
    "potato",
    "onion",
    "garlic",
    "pepper",
    "lettuce",
    "broccoli",
    "spinach",
    "zucchini",
    "cucumber",
    "celery",
    "cauliflower",
    "asparagus",
    "mushroom",
    "pumpkin",
    "radish",
    "beetroot",
    "turnip",
    "parsnip",
    "elephant",
    "giraffe",
    "tiger",
    "lion",
    "cheetah",
    "leopard",
    "zebra",
    "rhino",
    "hippo",
    "buffalo",
    "kangaroo",
    "koala",
    "panda",
    "sloth",
    "chimpanzee",
    "gorilla",
    "orangutan",
    "lemur",
    "meerkat",
    "otter",
    "shark",
    "whale",
    "dolphin",
    "seal",
    "octopus",
    "jellyfish",
    "lobster",
    "crab",
    "shrimp",
    "starfish",
    "eagle",
    "sparrow",
    "parrot",
    "penguin",
    "ostrich",
    "flamingo",
    "peacock",
    "hummingbird",
    "owl",
    "falcon",
    "house",
    "apartment",
    "mansion",
    "cottage",
    "bungalow",
    "castle",
    "villa",
    "shack",
    "chalet",
    "palace",
    "bed",
    "chair",
    "table",
    "desk",
    "sofa",
    "couch",
    "cabinet",
    "wardrobe",
    "bookshelf",
    "dresser",
    "car",
    "bicycle",
    "motorcycle",
    "scooter",
    "truck",
    "bus",
    "train",
    "airplane",
    "helicopter",
    "boat",
    "submarine",
    "rocket",
    "spaceship",
    "hovercraft",
    "tram",
    "trolley",
    "taxi",
    "ferry",
    "yacht",
    "canoe",
    "violin",
    "guitar",
    "piano",
    "trumpet",
    "flute",
    "drums",
    "clarinet",
    "saxophone",
    "cello",
    "harp",
    "concert",
    "symphony",
    "melody",
    "harmony",
    "rhythm",
    "tempo",
    "note",
    "scale",
    "chord",
    "tune",
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "goldfish",
    "parakeet",
    "ferret",
    "guinea",
    "chinchilla",
    "gerbil",
    "winter",
    "spring",
    "summer",
    "autumn",
    "snow",
    "rain",
    "hail",
    "sleet",
    "fog",
    "storm",
    "mountain",
    "river",
    "lake",
    "ocean",
    "forest",
    "desert",
    "valley",
    "canyon",
    "island",
    "waterfall",
    "kitchen",
    "bathroom",
    "bedroom",
    "livingroom",
    "garage",
    "basement",
    "attic",
    "hallway",
    "balcony",
    "patio",
    "science",
    "history",
    "math",
    "geography",
    "chemistry",
    "biology",
    "physics",
    "astronomy",
    "literature",
    "philosophy",
    "football",
    "basketball",
    "tennis",
    "golf",
    "soccer",
    "baseball",
    "hockey",
    "cricket",
    "rugby",
    "volleyball"
  ]
  

function initializeGame() {
    isGameFinished = false;
    guessesLeft = maximumGuesses;

    const randomIndex = Math.floor(Math.random() * wordBank.length);
    chosenWord = wordBank[randomIndex];

    displayWordArray = [];
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

resetButton.addEventListener('click', initializeGame);
initializeGame();