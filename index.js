#!/usr/bin/env
import readline from "readline";

console.log(`Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You need to guess the correct number.`);

console.log("Please select the difficulty level:");
console.log("1. Easy (10 chances)");
console.log("2. Medium (5 chances)");
console.log("3. Hard (3 chances)");

const randomNum = Math.floor(Math.random() * 100);

let chances;
let isGameOver = false;
let guesses = 0;

const checkAnswer = (input) => {
  let message;
  guesses = guesses + 1;
  if (guesses >= chances && input != randomNum) {
    isGameOver = true;
    message = `Oops!You have reached the maximum number of attempts. The correct number was ${randomNum}.`;
  } else if (input > randomNum) {
    message = `Incorrect! the number is less than ${input}`;
  } else if (input < randomNum) {
    message = `Incorrect! the number is greater than ${input}`;
  } else if (input == randomNum) {
    isGameOver = true;
    message = `Congratulations! You guessed the correct number in ${guesses} attempts.`;
  }
  return message;
};

const setChanceCount = (type) => {
  switch (type) {
    case "Easy":
      chances = 10;
      break;
    case "Medium":
      chances = 5;
      break;
    case "Difficult":
      chances = 3;
      break;
    default:
      console.log("Invalid choice. Please select a valid option.");
  }
};

const gameLoop = () => {
  rl.question("Enter your guess:", (input) => {
    console.log(checkAnswer(input));
    if (!isGameOver) {
      gameLoop();
    } else {
      rl.close();
    }
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your choice:", (choice) => {
  switch (choice) {
    case "1": {
      setChanceCount("Easy");
      console.log(
        "Great! You have selected the Easy difficulty level.Let's start the game!",
      );
      gameLoop();
      break;
    }
    case "2": {
      setChanceCount("Medium");
      console.log(
        "Great! You have selected the Medium difficulty level.Let's start the game!",
      );
      gameLoop();
      break;
    }
    case "3": {
      setChanceCount("Difficult");
      console.log(
        "Great! You have selected the Hard difficulty level.Let's start the game!",
      );
      gameLoop();

      break;
    }
    default: {
      console.log("Invalid choice. Please select a valid option.");
    }
  }

  //   rl.close();
});
