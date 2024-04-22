const suits = ['h', 'd', 'c', 's'];
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '01'];

// Initialize an empty deck
const deck = [];

// Create the deck of cards
for (const suit of suits) {
    for (const value of values) {
        const card = {
            suit: suit,
            value: value,
            imageUrl: `./assets/images/cards/${suit}${value}.webp` // Example URL for card image
        };
        deck.push(card);
    }
}

// the game area and end game screen is hidden initially
document.querySelector(".game-area").style.display = "none";
document.querySelector(".end-game-screen").style.display = "none";

// On document load
document.addEventListener("DOMContentLoaded", function() {
    const startButton =  document.querySelector(".play-button");
    // Event listener for the "Let's Play" button
    if(startButton) {
        startButton.addEventListener("click", startGame);
    } else {
        console.error('Start button not found');
    }

});

// Functions

function startGame() {
    // Hide the game rules
    document.querySelector(".game-rules").style.display = "none";
    // Show the game area
    document.querySelector(".game-area").style.display = "block";
}

function dealCard() {

}

function hit() {

}

function stand() {

}

function determineWinner() {

}

function getHandValue() {

}

function endGame() {

}