//const guesses = [];
const guesses = [];
let currentGuess = '';
let correctWord = '';

const dict = {};

// Open up the local dictionary json file
fetch('./dictionary.json').then((response) =>
  response.json().then((data) => {
    // Create a new dictionary that sorts all words into categories by
    // number of letters
    Object.getOwnPropertyNames(data).forEach((word) => {
      const wordLength = word.length.toString();
      // If this word length has not been encountered yet
      // Create new array of words for that keyed by that word length
      if (!dict.hasOwnProperty(wordLength)) {
        dict[wordLength] = [];
      }
      // Add word to our sorted dictionary
      dict[wordLength].push({ word, definition: data[word] });
    });

    startGame(5);
  })
);

// Key event handler
document.addEventListener('keydown', (e) => {
  // Backspace - remove last key
  if (e.key == 'Backspace') {
    // Stop backspace from going back in browser history
    e.preventDefault();
    if (currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, currentGuess.length - 1);
    }
  // A - Z
  } else if (
    e.key.length == 1 &&
    e.key.toUpperCase() >= 'A' &&
    e.key.toUpperCase() <= 'Z' &&
    currentGuess.length < correctWord.length
  ) {
    currentGuess += e.key.toUpperCase();
  // Enter for guess
  } else if (e.key == 'Enter') {
    guesses.push(currentGuess);
    currentGuess = '';
  }
  
  render();
});

// Get a random word to guess using length as a parameter
function startGame(wordLength) {
  wordLength = wordLength.toString();

  // Keep trying to get random words if it happens to contain punctuation
  const allLetters = /^\w+$/;
  do {
    correctWord =
      dict[wordLength][
        Math.floor(Math.random() * Object.keys(dict[wordLength]).length)
      ].word.toUpperCase();
  } while (!allLetters.test(correctWord));

  // Get rid of all guesses
  guesses.splice(0, guesses.length);
  currentGuess = '';

  render();
}

function render() {
  ReactDOM.render(
    React.createElement(Guesses, { guesses, currentGuess, correctWord }, null),
    document.querySelector('#guesses')
  );
  ReactDOM.render(
    React.createElement(RemainingLetters, {guesses, correctWord}, null),
    document.querySelector('#remainingLetters')
  );
}
