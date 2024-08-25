// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let choice = this.getAttribute("data-choice");

            if (choice === "0") {
                alert("You selected Rock");
            } else if (choice === "1") {
                alert("You selected Paper");
            } else if (choice === "2") {
                alert("You selected Scissors");
            } else if (choice === "3") {
                alert("You selected Lizard");
            } else if (choice === "4") {
                alert("You selected Spock");
            }
        });
    }
});

