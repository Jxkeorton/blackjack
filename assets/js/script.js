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
document.querySelector(".betting-options").style.display = "none";

// On document load
document.addEventListener("DOMContentLoaded", function() {
    // Initialize player's chip count
    let playerChips = 3000;

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
    // Show the betting options
    const bettingOptions = document.querySelector(".betting-options");
    bettingOptions.style.display = "block";
    // Add event listener to betting chip buttons
    const chipButtons = document.querySelectorAll(".chip");
    chipButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Get the value of the chip/button clicked
            const betAmount = parseInt(this.value);
            // Call a function to handle the betting logic (e.g., update pot, subtract chips from player's chips, etc.)
            handleBet(betAmount);
            // Hide the betting options after the bet is placed
            bettingOptions.style.display = "none";
            // Proceed to deal the cards
            dealCards();
        });
    });
}

function handleBet(amount) {
    // Subtract the bet amount from player's chip count
    playerChips -= amount;
    updateChipCount(playerChips);
    
    const betAmountElement = document.querySelector(".your-bet");
    betAmountElement.textContent = `Your bet: ${amount}`;

    console.log("Player bets:", amount);
}

function updateChipCount(chips) {
    const chipCountElement = document.querySelector(".betting-options p");
    chipCountElement.textContent = `Your chips: ${chips}`;
}

function dealCards() {

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