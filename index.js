#!/usr/bin/env
import readline from "readline";

let chances;
let replay = false;
let isGameOver = false;
let startTime;
let endTime;
let duration = endTime - startTime;
let guesses = 0;
let randomNum = Math.floor(Math.random() * 100);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const displayWelcome = () => {
  console.log(`Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You need to guess the correct number.`);
};
const displayOptions = () => {
  console.log("Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)");
};

const checkAnswer = (input) => {
  let message;
  guesses = guesses + 1;

  if (isNaN(input)) {
    message = "Please enter a valid number";
  }
  if (guesses >= chances && input != randomNum) {
    isGameOver = true;
    endTime = Date.now();
    message = `Oops!You have reached the maximum number of attempts. The correct number was ${randomNum}.`;
  } else if (input > randomNum) {
    message = `Incorrect! the number is less than ${input}`;
  } else if (input < randomNum) {
    message = `Incorrect! the number is greater than ${input}`;
  } else if (input == randomNum) {
    isGameOver = true;
    endTime = Date.now();
    message = `Congratulations! You guessed the correct number in ${guesses} attempts in ${duration} milliseconds.`;
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
    case "Hard":
      chances = 3;
      break;
    default:
      console.log("Invalid choice. Please select a valid option.");
  }
};

const resetValues = () => {
  isGameOver = false;
  replay = false;
  guesses = 0;
  randomNum = Math.floor(Math.random() * 100);
};

const gameLoop = () => {
  rl.question("Enter your guess:", (input) => {
    if (!input) {
      console.log("No input entered!");
      rl.close();
      return;
    }
    console.log(checkAnswer(input));
    if (isGameOver) {
      rl.question("Do you want to play again? y/n: ", (ans) => {
        if (ans.trim().toLowerCase() == "y") {
          startGame();
          gameLoop();
          resetValues();
        } else if (ans.trim().toLowerCase() == "n") {
          rl.close();
        } else {
          console.log("Invalid answer!");
          rl.close();
        }
      });
      return;
    } else if (!isGameOver && !replay) {
      gameLoop();
    } else {
      rl.close();
    }
  });
};

const startGame = () => {
  displayOptions();
  rl.question("Enter your choice:", (choice) => {
    if (!choice) {
      console.log("No input entered!");
      rl.close();
      return;
    }
    startTime = Date.now();
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
        setChanceCount("Hard");
        console.log(
          "Great! You have selected the Hard difficulty level.Let's start the game!",
        );
        gameLoop();

        break;
      }
      default: {
        console.log("Invalid choice. Please select a valid option.");
        rl.close();
      }
    }
  });
};

displayWelcome();
startGame();
