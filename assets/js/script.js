const suits = ['h', 'd', 'c', 's'];
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '01'];

const deck = [];
let currentBet = 0; 
let playerChips = 3000;

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
    

    const startButton =  document.querySelector(".play-button");
    // Event listener for the "Let's Play" button
    if(startButton) {
        startButton.addEventListener("click", startGame);
    } else {
        console.error('Start button not found');
    }

});

// Functions

function startGame(event) {
    event.preventDefault();
    // Hide the game rules
    document.querySelector(".game-rules").style.display = "none";
    // Show the betting options
    const bettingOptions = document.querySelector(".betting-options");
    bettingOptions.style.display = "block";
}

function handleBet(amount) {
    if (playerChips >= amount) {
        // Add the bet amount to the current bet
        currentBet += amount;
        // Subtract the bet amount from player's chip count
        playerChips -= amount;
    } else {
        // If player doesn't have enough chips, set the current bet to their remaining chips
        currentBet += playerChips;
        // Set player chips to 0
        playerChips = 0;

        console.log("All in")
    }
    updateChipCount(playerChips);

    const betAmountElement = document.querySelector(".your-bet");
    betAmountElement.textContent = `Your bet: ${currentBet}`;

    console.log("Player bets:", currentBet);

    const placeBetButton = document.querySelector(".place-bet-button")
    placeBetButton.addEventListener("click", betPlaced)
}

function updateChipCount(chips) {
    const chipCountElement = document.querySelector(".your-chips");
    chipCountElement.textContent = `Your chips: ${chips}`;
}

function betPlaced() {
    document.querySelector(".betting-options").style.display = "none";
    document.querySelector(".game-area").style.display = "block";

    const chipCountElement = document.querySelector(".the-pot");
    chipCountElement.textContent = `${currentBet}` * 2;

    const playerChipCount = document.querySelector(".player-chips");
    playerChipCount.textContent = `Your chips: ${playerChips}`;

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