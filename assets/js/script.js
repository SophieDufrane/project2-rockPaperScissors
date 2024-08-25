// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let userChoice = this.getAttribute("data-choice");
            runGame(userChoice);
        });
    }
});

const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const userImage = document.getElementById("user-selection");
const computerImage = document.getElementById("computer-selection");

function runGame(userChoice) {
	
	userImage.src = `assets/images/${choices[userChoice]}.png`;
	userImage.alt = choices[userChoice];
	
	let computerChoice = Math.floor(Math.random() * 5);
	
	computerImage.src = `assets/images/${choices[computerChoice]}.png`;
	computerImage.alt = choices[computerChoice];
	
	let result = checkWinner(choices[playerChoice], choices[computerChoice]);
	
	updateScores(result);
}
