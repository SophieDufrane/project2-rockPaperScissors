// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let userSelection = this.getAttribute("data-selection");
            runGame(userSelection);
        });
    }
});


// Declare variable for DOM elements
const selection = ["rock", "paper", "scissors", "lizard", "spock"];
const userIcon = document.getElementById("user-selection");
const computerIcon = document.getElementById("computer-selection");

/**
 * Main game funtion, with one parameter: the user choice
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
	
    // check result with the function checkWinner with 2 variable, the user and computer selection.
	let result = checkWinner(selection[userSelection], selection[computerSelection]);
	
	updateScores(result);
}


function checkWinner (userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "draw";
    }

    if (
        (userSelection === "rock" && computerSelection === "lizard" || userSelection === "rock" && computerSelection === "scissors")
        (userSelection === "paper" && computerSelection === "rock" || userSelection === "paper" && computerSelection === "spock")
        (userSelection === "scissors" && computerSelection === "paper" || userSelection === "scissors" && computerSelection === "lizard")
        (userSelection === "lizard" && computerSelection === "spock" || userSelection === "lizard" && computerSelection === "paper")
        (userSelection === "spock" && computerSelection === "scissors" || userSelection === "spock" && computerSelection === "rock")
    ) {
        return "win";
    } else {
        return "lose"
    }
}


function incrementScore() {

}
