// https://jsdoc.app
// Thato & Terrance
/**
 * @function checkGuess
 * Checks guess for "mastermind" game against solution
 *
 * @param {string} guess - the solution to the
 * @param {string} solution - the target for the guess
 *
 * @returns {string} - an string representing the number of correct numbers
 *                     in the correct position and the number of correct
 *                     numbers in the incorrect position for the guess
 *
 * @example
 * checkGuess('1532, '1234')
 * // returns '2-1'
 * // two numbers in the correct place (1 and 3)
 * // and one correct number in the incorrect place (2)
 *
 */
function checkGuess(guess, solution) {
  let rightPlace = 0;
  let wrongPlace = 0;

  // Convert strings to arrays for easier manipulation
  const guessArr = guess.split('');
  const solutionArr = solution.split('');

  // Step 1: Track which positions matched
  const unmatchedGuess = [];
  const unmatchedSolution = [];

  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === solutionArr[i]) {
      rightPlace++;
    } else {
      unmatchedGuess.push(guessArr[i]);
      unmatchedSolution.push(solutionArr[i]);
    }
  }

  // Step 2: Count characters in the wrong place
  unmatchedGuess.forEach(char => {
    const index = unmatchedSolution.indexOf(char);
    if (index !== -1) {
      wrongPlace++;
      unmatchedSolution.splice(index, 1); // Remove matched char so it's not reused
    }
  });

  return `${rightPlace}-${wrongPlace}`;
}


// https://jsdoc.app
/**
 * @function processInput
 * Checks guesses for "mastermind" game against solution
 *
 * @param {string} solution - the target for the guesses
 * @param {string[]} guesses - an array of strings representing guesses
 *
 * @returns {string[]} - an array of strings representing the number of
 *                       correct numbers in the correct position and the number
 *                       of correct numbers in the incorrect position for each
 *                       guess
 *
 * @example
 * // returns ['2-1', '0-1']
 * processInput('1234', ['1532', '8793'])
 *
 */
function processInput(solution, guesses) {
  return guesses.map((guess) => checkGuess(guess, solution));
}

// ----------- main program ------- //
// process arguments via destructuring
//
const [solution, guessCount, ...guesses] = process.argv.slice(2);

// (lightly) verify the input
if (guesses.length !== Number(guessCount)) {
  console.warn(
    `The number of guesses provided (${guesses.length}) does not match the guess count (${guessCount}).`
  );
  console.warn("Exiting.");
  process.exit(-1);
}

// pass the input to the processor and print the output
const output = processInput(solution, guesses);
console.log(output.join(" "));
