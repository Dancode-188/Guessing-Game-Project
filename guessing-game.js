const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
let secretNumber;
let guessCount;

function askGuess(){
    const rl = readline.createInterface({
        input,
        output
    });

    rl.question("Enter a guess: ", (number) => {
        if (checkGuess(number)) {
            rl.close();
            return;
        }
        guessCount--;
        if (guessCount === 0) {
            console.log(`You ran out of guesses. The number was ${secretNumber}`);
            rl.close();
            return;
        }
        console.log(`You have ${guessCount} guesses remaining`);
        askGuess();
    });
}

function randomInRange(min, max){
    secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return secretNumber;
}

function askRange(){
    const rl = readline.createInterface({
        input,
        output
    });

    rl.question("Enter the minimum number: ", (min) => {
        rl.question("Enter the maximum number: ", (max) => {
            if (min > max) {
                console.log("Minimum number must be less than the maximum number.");
                rl.close();
                return;
            }
            console.log(`I'm thinking of a number between ${min} and ${max}`);
            randomInRange(Number(min), Number(max));
            askGuess();
        });
    });
}

function askLimit(){
    const rl = readline.createInterface({ 
        input,
        output
    });

    rl.question("Enter the number of guesses: ", (limit) => {
        guessCount = Number(limit);
        askRange();
    });
}

function checkGuess(number) {
  if (Number(number) === secretNumber) {
    console.log("Correct!");
    return true;
  } else if (number > secretNumber) {
    console.log("Too high");
    return false;
  } else {
    console.log("Too low");
    return false;
  }
}

askLimit();
