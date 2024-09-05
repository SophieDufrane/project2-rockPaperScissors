// Wait for the DOM to finish loading before running the game.
// Source: https://github.com/Code-Institute-Solutions/love-maths-2.0-sourcecode/tree/master
// Author: NielMc
// This function was adapted from [love-maths-2.0-sourcecode]. 
// Modifications: in this version, the event listener retrieves the data-selection from the clicked button 
// then call the runGame function with userSelection as an argument.
document.addEventListener("DOMContentLoaded", function prepareGame() {
    let buttons = document.getElementsByClassName("button-selection");

    // Add click event listener to each button
    for (let button of buttons) {
        button.addEventListener("click", function handleUserSelection() {
            let userSelection = parseInt(this.getAttribute("data-selection"));
            runGame(userSelection);
        });
    }
});

// Add click event listener to the rules button that calls the toggleRulesSection function
document.getElementById("rules-toggle").addEventListener("click", toggleRulesSection);

// Add click event listener to the restart button that calls the resetGame function
document.getElementById("restart-button").addEventListener("click", resetGame);

// Declare constant object that groups each choice (to avoid mistakes along the code)
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;
const LIZARD = 3;
const SPOCK = 4;

// Map the constants to their corresponding string values
const selection = {
    [ROCK]: "rock",
    [PAPER]: "paper",
    [SCISSORS]: "scissors",
    [LIZARD]: "lizard",
    [SPOCK]: "spock"
};

// Define the rules of the game with each possible combinations
const rules = {
    [ROCK]: {
        [LIZARD]: "Rock crushes Lizard",
        [SCISSORS]: "Rock crushes Scissors"
    },
    [PAPER]: {
        [ROCK]: "Paper covers Rock",
        [SPOCK]: "Paper disproves Spock"
    },
    [SCISSORS]: {
        [PAPER]: "Scissors cuts Paper",
        [LIZARD]: "Scissors decapitates Lizard"
    },
    [LIZARD]: {
        [SPOCK]: "Lizard poisons Spock",
        [PAPER]: "Lizard eats Paper"
    },
    [SPOCK]: {
        [SCISSORS]: "Spock smashes Scissors",
        [ROCK]: "Spock vaporizes Rock"
    }
};

// Set the maximum score for a player to win the game
const MAX_SCORE = 5;

// Get DOM elements for user and computer selections
const userIcon = document.getElementById("user-selection");
const computerIcon = document.getElementById("computer-selection");

// Initialise a variable to keep track of the round number
let roundNumber = 1;

/**
 * Toggle the visibility of the rules section.
 * 
 * When the rules section is hidden, the function will display it and
 * change the toggle's button text to "Hidden rules".
 * When the rules section is visible, the function will hide it and
 * change the toggle's button text to "View rules".
 * 
 * This function is triggered by a click on the toggle button.
 */
function toggleRulesSection() {
    let rulesSection = document.getElementById("rules-section");

    if (rulesSection.style.display === "none") {
        rulesSection.style.display = "block";
        this.textContent = "Hide rules";
    } else {
        rulesSection.style.display = "none";
        this.textContent = "View rules";
    }
}

/**
 * Run the main game logic.
 * 
 * @param {string} userSelection - The user's choice, which corresponds to the data-selection of the icon (button) selected (e.g. "Rock", "Paper", "Scissors", "Lizard", or "Spock").
 * 
 * Prevent the game from continuing after a player reaches 5 points.
 * Update the images for both the user and the computer based on their selections.
 * Determine the winner by comparing the user's selection with a randomly generated computer's selection.
 * Call functions to update the result message, rule message, and scores.
 */
function runGame(userSelection) {

    // Prevent the game from continuing after a player reaches MAX_SCORE points
    let userScore = parseInt(document.getElementById("user-score").innerText);
    let computerScore = parseInt(document.getElementById("computer-score").innerText);

    if (userScore >= MAX_SCORE || computerScore >= MAX_SCORE) {
        return; // Do nothing as the game is over
    }

    // Update the user's selected image
    userIcon.src = `assets/images/${selection[userSelection]}.png`;
    userIcon.alt = selection[userSelection];

    // Get the computer's selection by generating a random number between 0 and the number of options available
    let computerSelection = Math.floor(Math.random() * Object.keys(selection).length);

    // Update the computer's selected image
    computerIcon.src = `assets/images/${selection[computerSelection]}.png`;
    computerIcon.alt = selection[computerSelection];

    // Determine the result of the round
    let result = checkWinner(userSelection, computerSelection);

    // Update Game status, result message and scores based on result
    updateGameStatus(result);
    updateRuleMessage(userSelection, computerSelection);
    updateScores(result);

    // Check if the game is over (either player reaches 5 points)
    checkGameOver();
}

/**
 * Determine the winning conditions and results based on the rules
 * 
 * @param {number} userSelection - The user's selection
 * @param {number} computerSelection - The computer's selection
 * @return {string} The result of the round ("win", "lose", "draw")
 */
function checkWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "draw";
    }
    // Check if the userSelection beats the computerSelection based on the rules object
    if (rules[userSelection] && rules[userSelection][computerSelection]) {
        return "win";
    } else {
        return "lose";
    }
}

/**
 * Update the game status to display the current round number
 */
function updateGameStatus() {
    let gameStatus = document.getElementById("game-status");
    gameStatus.textContent = `Round ${roundNumber}`;
    roundNumber++;
}

/**
 * Update the rule message based on the user's selection and computer's one
 * 
 * @param {number} userSelection - The user's selection
 * @param {number} computerSelection - The computer's selection
 */
function updateRuleMessage(userSelection, computerSelection) {
    let ruleMessage = document.getElementById("rule-applied");

    if (userSelection === computerSelection) {
        ruleMessage.textContent = "Mind match, draw!";
        //Accesses the specific rule within the rules object, then check the combination between userSelection and computerSelection.
    } else if (rules[userSelection] && rules[userSelection][computerSelection]) {
        ruleMessage.textContent = rules[userSelection][computerSelection];
    } else {
        ruleMessage.textContent = rules[computerSelection][userSelection];
    }
}

/**
 * Update the score based on the result of the current round
 * 
 * @param {string} The result of the round ("win", "lose", "draw")
 */
function updateScores(result) {
    if (result === "win") {
        incrementUserScore();
    } else if (result === "lose") {
        incrementComputerScore();
    }
}

/**
 * Increment the user's score by 1
 */
function incrementUserScore() {

    let oldScore = parseInt(document.getElementById("user-score").innerText);
    document.getElementById("user-score").innerText = ++oldScore;

}

/**
 * Increment the computer's score by 1
 */
function incrementComputerScore() {

    let oldScore = parseInt(document.getElementById("computer-score").innerText);
    document.getElementById("computer-score").innerText = ++oldScore;
}

/**
 * Check if either the user or computer has reached 5 points, ending the game if true
 * Display the final result message
 */
function checkGameOver() {
    let userScore = parseInt(document.getElementById("user-score").innerText);
    let computerScore = parseInt(document.getElementById("computer-score").innerText);
    let gameStatus = document.getElementById("game-status");

    if (userScore >= MAX_SCORE) {
        gameStatus.textContent = "You Win!";
    } else if (computerScore >= MAX_SCORE) {
        gameStatus.textContent = "Kirk beat you!";
    }
}

/**
 * Reset the game to default value and images
 * 
 * This function resets the scores, the round number, the message that displays the rule that applies on last round.
 * It also reset the images of the user and computer selections to defaut state 
 */
function resetGame() {

    // Reset the scores
    document.getElementById("user-score").innerText = 0;
    document.getElementById("computer-score").innerText = 0;

    // Reset the round number
    roundNumber = 1;

    // Clear the game status and rule message
    document.getElementById("game-status").textContent = `Score`;
    document.getElementById("rule-applied").textContent = `Let's Play!`;

    // Reset the images to defaut state
    userIcon.src = `assets/images/spockPortrait.jpg`;
    userIcon.alt = `User selection icon`;
    computerIcon.src = `assets/images/kirkPortrait.jpg`;
    computerIcon.alt = `Computer selection icon`;
}