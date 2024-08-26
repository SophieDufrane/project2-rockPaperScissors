// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let userSelection = parseInt(this.getAttribute("data-selection"));
            runGame(userSelection);
        });
    }
});


// Declare variable for DOM elements
const selection = ["rock", "paper", "scissors", "lizard", "spock"];
const userIcon = document.getElementById("user-selection");
const computerIcon = document.getElementById("computer-selection");

/**
 * Main game function, with one parameter: the user choice
 * which is the data-selection of the button selected (Rock, paper, scissors...)  
 */
function runGame(userSelection) {
	 
    // Update the user's selected image
    userIcon.src = `assets/images/${selection[userSelection]}.png`;
	userIcon.alt = selection[userSelection];
	
     // Get the computer selecyion by creation a random number between 0 and 4
	let computerSelection = Math.floor(Math.random() * 5);
	
    // Update the computer's selected image
	computerIcon.src = `assets/images/${selection[computerSelection]}.png`;
	computerIcon.alt = selection[computerSelection];
	
    // check result with the function checkWinner with 2 variables, the user and computer selection.
    let result = checkWinner(selection[userSelection],selection[computerSelection]);

    updateResultMessage(result);

    updateRuleMessage(selection[userSelection],selection[computerSelection]);

    // Update scores (not implemented yet!!!!)
    updateScores(result);
}

/**
 * Check combinations and determine the winning conditions and results based on the rules
 */
function checkWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "draw";
    }

    if (
        (userSelection === "rock" && (computerSelection === "lizard" || computerSelection === "scissors")) ||
        (userSelection === "paper" && (computerSelection === "rock" || computerSelection === "spock")) ||
        (userSelection === "scissors" && (computerSelection === "paper" || computerSelection === "lizard")) ||
        (userSelection === "lizard" && (computerSelection === "spock" || computerSelection === "paper")) ||
        (userSelection === "spock" && (computerSelection === "scissors" || computerSelection === "rock"))
    ) {
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

function updateRuleMessage(result) {
    let ruleMessage = document.getElementById("rule-applied");

    if (userSelection === "rock" && computerSelection === "lizard") {
        ruleMessage.textContent = "Rock crushes Lizard";
    } else {
        ruleMessage.textContent = "Another rule applies";
    }
}

function incrementScore() {

}
