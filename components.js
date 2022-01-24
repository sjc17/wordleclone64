'use strict';

// All the guesses and the current guess attempt will show up in this React element
// Composed of rows for each past guess attempt + current
// Each row has a col div element for each letter
function Guesses(props) {
  // All past attempts
  const output = props.guesses.map((guess) =>
    React.createElement(
      'div',
      { key: guess, className: 'row' },
      React.createElement(
        GuessLetters,
        { word: guess, correctWord: props.correctWord, isCurrentGuess: false },
        null
      )
    )
  );

  // Append current attempt
  output.push(
    React.createElement(
      'div',
      { key: 'CurrentGuess', className: 'row' },
      React.createElement(GuessLetters, {
        word: props.currentGuess,
        correctWord: props.correctWord,
        isCurrentGuess: true,
      })
    )
  );

  return React.createElement('div', null, output);
}

// If this is a current guess, all letters are not coloured
// If this is a past guess, color letters according to whether they
// show up in the actual word or not.
function GuessLetters(props) {
  const charArray = props.word.split('');
  const correctCharArray = props.correctWord.split('');
  const output = [];

  // Using the correct word's length, pad the guess word char array
  while (charArray.length < correctCharArray.length) {
    charArray.push('');
  }

  // Iterate through all the char positions and color the blocks appropriately
  for (let i = 0; i < correctCharArray.length; ++i) {
    let matchClass = '';

    // Past guess, color correct/incorrect blocks
    if (!props.isCurrentGuess) {
      // Char is correct
      if (charArray[i] == correctCharArray[i]) {
        matchClass = 'correct';
      }
      // Char is incorrect, but found elsewhere in the word
      else if (props.correctWord.includes(charArray[i])) {
        matchClass = 'misplaced';
      }
      // Char is not in the word at all
      else {
        matchClass = 'incorrect';
      }
    }
    // Current guess, just color it white
    else {
      matchClass = 'currentGuess';
    }

    output.push(
      React.createElement(
        'div',
        { key: props.word + i, className: 'col ' + matchClass },
        charArray[i]
      )
    );
  }
  return output;
}

function RemainingLetters(props) {
  const { guesses, correctWord } = props;
  const allLetterStatus = [];
  const allLetterOutput = [];
  const correctLetters = [];
  const misplacedLetters = [];

  console.log(correctWord);

  // Iterate through alphabet and instantiate an array of letter statuses
  for (let chr = 0; chr < 26; ++chr) {
    allLetterStatus.push({
      // Uppercase letter from char position in alphabet
      letter: (chr + 10).toString(36).toUpperCase(),
      // Options: Incorrect, Misplaced, Correct
      status: 'incorrect',
    });
  }

  // Find all correct/misplaced guesses
  guesses.forEach(guess => {
    for (let i = 0; i < guess.length; ++i) {
      const guessLetter = guess.charAt(i);
      if (guessLetter == correctWord.charAt(i)) {
        correctLetters.push(guessLetter);
      }
      else if (correctWord.includes(guessLetter)) {
        misplacedLetters.push(guessLetter);
      }
    }
  });

  // Update misplaced letter statuses
  misplacedLetters.forEach(letter => {
    allLetterStatus.find(obj => obj.letter == letter).status = 'misplaced';
  });

  // Update correct letter statuses 
  correctLetters.forEach(letter => {
    allLetterStatus.find(obj => obj.letter == letter).status = 'correct';
  });
  
  // Create React elements to be rendered
  for (let i = 0; i < 26; ++i) {
    allLetterOutput.push(
      React.createElement(
        'div',
        { key: 'letter' + i, className: 'col text-center ' + allLetterStatus[i].status },
        allLetterStatus[i].letter
      )
    );
  }

  return React.createElement('div', {className: 'row'}, allLetterOutput);
}
