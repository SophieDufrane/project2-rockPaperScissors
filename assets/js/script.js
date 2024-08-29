// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByClassName("button-selection");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let userSelection = parseInt(this.getAttribute("data-selection"));
            runGame(userSelection);
        });
    }
});

// Declare constant for each choice to avoid mistakes along the code
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;
const LIZARD = 3;
const SPOCK = 4;

// Declare other variables for DOM elements
const selection = {
    [ROCK]: "rock", 
    [PAPER]:"paper", 
    [SCISSORS]:"scissors", 
    [LIZARD]:"lizard", 
    [SPOCK]:"spock"
};

const userIcon = document.getElementById("user-selection");
const computerIcon = document.getElementById("computer-selection");

// Declare an object to address all the combinations possible
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

/**
 * Runs the main game logic.
 * 
 * @param {string} userSelection - The user's choice, which corresponds to the data-selection of the button selected (e.g. "Rock", "Paper", "Scissors", "Lizard", or "Spock").
 * 
 * Updates the images for both the user and the computer based on their selections.
 * Determines the winner by comparing the user's selection with a randomly generated computer selection.
 * Calls functions to update the result message, rule message, and (future implementation) scores.
 */
function runGame(userSelection) {
	 
    // Update the user's selected image
    userIcon.src = `assets/images/${selection[userSelection]}.png`;
	userIcon.alt = selection[userSelection];
	
     // Get the computer's selection by creating a random number between 0 and the selection.length
	let computerSelection = Math.floor(Math.random() * Object.keys(selection).length);
	
    // Update the computer's selected image
	computerIcon.src = `assets/images/${selection[computerSelection]}.png`;
	computerIcon.alt = selection[computerSelection];
	
    // check result with the function checkWinner with 2 variables, the user and computer selection
    let result = checkWinner(userSelection,computerSelection);

    updateResultMessage(result);

    updateRuleMessage(userSelection,computerSelection);

    updateScores(result);
}

/**
 * Check combinations and determine the winning conditions and results based on the rules
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

function updateResultMessage(result) {
    let resultMessage = document.getElementById("result-message");

    if (result === "win") {
        resultMessage.textContent = "You Win!";
    } else if (result === "lose") {
        resultMessage.textContent = "Kirk beat you!";
    } else {
        resultMessage.textContent = "It's a draw";
    }
}

function updateRuleMessage(userSelection, computerSelection) {
    let ruleMessage = document.getElementById("rule-applied");

    if (userSelection === computerSelection) {
        ruleMessage.textContent = "Mind match, draw!";
    //To accesses the specific rule text within the rules object, then check the interaction between userSelection and computerSelection.
    } else if (rules[userSelection] && rules[userSelection][computerSelection]) {
        ruleMessage.textContent = rules[userSelection][computerSelection];
    } else {
        ruleMessage.textContent = rules[computerSelection][userSelection];
    }
}

/**
 * Update the score based on the result
 */
function updateScores (result) {
    if (result === "win") {
        incrementUserScore(); 
    } else if (result === "lose") {
        incrementComputerScore();
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementUserScore() {

    let oldScore = parseInt(document.getElementById("user-score").innerText);
    document.getElementById("user-score").innerText = ++oldScore;

}

function incrementComputerScore() {

    let oldScore = parseInt(document.getElementById("computer-score").innerText);
    document.getElementById("computer-score").innerText = ++oldScore;

}
