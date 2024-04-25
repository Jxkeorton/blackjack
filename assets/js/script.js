const suits = ['h', 'd', 'c', 's'];
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '01'];

const deck = [];
const playersHand = [];
const dealersHand = [];
let currentBet = 0; 
let playerChips = 3000;
let currentCardIndex = 4;
let multiplier = 1;

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
    if(event) {
        event.preventDefault();
    }

    // Reset player chips and currentBet
    playerChips = 3000
    currentBet = 0;

    console.log(playerChips, currentBet)
    // Hide unrelevant areas
    document.querySelector(".game-rules").style.display = "none";
    document.querySelector(".game-area").style.display = "none";
    document.querySelector(".end-game-screen").style.display = "none";

    // Show the betting options
    const bettingOptions = document.querySelector(".betting-options");
    bettingOptions.style.display = "block";
    
    handleBet(0)
}

// When the user clicks a chip to bet with it recalculates the ammount
function handleBet(amount) {

    // Accounts for chipcount from previous rounds
    updateChipCount(playerChips);

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


    const placeBetButton = document.querySelector(".place-bet-button")
    placeBetButton.addEventListener("click", betPlaced)
}

function updateChipCount(chips) {
    const chipCountElement = document.querySelector(".your-chips");
    chipCountElement.textContent = `Your chips: ${chips}`;
}

// Once the place bet button is pressed this function will display the game area
// It also primes the buttons on the screen with the relevant functions.
function betPlaced() {
    document.querySelector(".betting-options").style.display = "none";
    document.querySelector(".game-area").style.display = "block";

    const chipCountElement = document.querySelector(".the-pot");
    chipCountElement.textContent = `${currentBet}` * 2;

    const playerChipCount = document.querySelector(".player-chips");
    playerChipCount.textContent = `Your chips: ${playerChips}`;

    dealCards()

    // Add event listeners for the hit and stand buttons
    const hitButton = document.querySelector(".hit")
    const standButton = document.querySelector(".stand")

    hitButton.addEventListener("click", hit)
    standButton.addEventListener("click", stand)
}

// As the game screen appears the cards are dealt to each player
function dealCards() {
    console.log(deck)

    shuffleCards()
    const card1 = document.querySelector(".card1")
    const card3 = document.querySelector(".card3")
    const card4 = document.querySelector(".card4")

    card1.src = deck[0].imageUrl;
    card3.src = deck[2].imageUrl;
    card4.src = deck[3].imageUrl;

    dealersHand.push(deck[0]);
    playersHand.push(deck[2]); 
    playersHand.push(deck[3]);

}

// This function ensures that cards are sorted randomly each turn.
function shuffleCards() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// When the hit button is pressed this function will run.
// It checks the player hand value not allowing the player to go above 21
// If they go over 21 they lose the game instantly
function hit() {
    const playersHandDiv = document.querySelector(".players-hand");

    // add card to player's hand
    playersHand.push(deck[currentCardIndex]);

    // Create a new img element for the new card
    const newCard = document.createElement("img");
    newCard.alt = `${deck[currentCardIndex].value}`;
    newCard.className = `card flip-in-ver-right card${currentCardIndex + 1}`;
    newCard.src = deck[currentCardIndex].imageUrl;

    // Adjust z-index to overlap previous cards
    newCard.style.zIndex = currentCardIndex;
    newCard.style.position = "absolute";
    newCard.style.left = 20 + (multiplier * 20) + "px";
    multiplier++

    currentCardIndex++;
    playersHandDiv.appendChild(newCard);

    const value = getHandValue(playersHand);

    if (value > 21) {
        console.log("BUST, end game here player loses");
    } else {
        console.log(`hand value: ${value}`);
    }
}


// When the stand button is pressed this function will run
function stand() {

    // Hide buttons from UI
    const hitButton = document.querySelector(".hit");
    const standButton = document.querySelector(".stand");
    hitButton.style.display = "none";
    standButton.style.display = "none";

    // Calculate value of hands
    let dealerValue = dealersTurn();
    let playerValue = getHandValue(playersHand)

    console.log(dealerValue)
    // Determine winner based off hand values
    let winner = determineWinner(dealerValue, playerValue)

}

// When this function is run the dealer will take his turn infront of the player
// It randomly chooses the number the dealer will hit / stand at 
function dealersTurn() {
    // Randomize the difficulty level of the dealer
    const dealersHitMax = Math.floor(Math.random() * 3) + 15; // Generates a random number between 15 and 18

    // Display the dealer's second card
    const card2 = document.querySelector(".right");
    card2.src = deck[currentCardIndex].imageUrl;
    dealersHand.push(deck[currentCardIndex]);

    currentCardIndex++;

    let value = getHandValue(dealersHand);

    // Dealer keeps hitting until the hand value is greater than the hit threshold
    while (value < dealersHitMax && value <= 21) {
        // Create a new img element for the additional card
        const newDealerCard = document.createElement("img");
        newDealerCard.alt = `${deck[currentCardIndex].value}`;
        newDealerCard.className = "card flip-in-ver-right";
        newDealerCard.src = deck[currentCardIndex].imageUrl;

        currentCardIndex++;
        dealersHand.push(deck[currentCardIndex]);
        
        const dealersHandDiv = document.querySelector(".dealers-hand");
        dealersHandDiv.appendChild(newDealerCard);

        value = getHandValue(dealersHand);
    }

    if (value > 21) {
        console.log("Dealer busts");
        console.log(dealersHand, value);
    } else {
        console.log(`Dealer stands with hand value: ${value}`);
        console.log(dealersHand, value);

        return value;
    }
}

// Once both turns are played this function determines the winner based off of the value of the hands.
function determineWinner(dealerValue, playerValue) {
    // Player busts, dealer wins
    if (playerValue > 21) {
        console.log("Player busts, dealer wins!");
        return "dealer";
    }
    // Dealer busts, player wins
    else if (dealerValue > 21) {
        console.log("Dealer busts, player wins!");
        return "player";
    }
    // Compare hand values
    else {
        if (playerValue > dealerValue) {
            console.log("Player wins!");
            return "player";
        } else if (playerValue < dealerValue) {
            console.log("Dealer wins!");
            return "dealer";
        } else {
            console.log("It's a tie!");
            return "tie";
        }
    }
}


// This function will determine the value of the cards a player or dealer is holding
// It takes aces into account as they can be 1 or 11
function getHandValue(hand) {
    let totalValue = 0;
    let numberOfAces = 0;

    for (let card of hand) {
        // Extract the numeric value of the card (assuming all face cards have value of 10)
        const value = parseInt(card.value) > 10 ? 10 : parseInt(card.value);
        totalValue += value;

        if (value === 1) {
            numberOfAces++;
        }
    }

    // Adjust the total value to account for Aces (Aces can be 1 or 11)
    while (numberOfAces > 0 && totalValue + 10 <= 21) {
        totalValue += 10; // recalculate the value of the hand
        numberOfAces--; // ensure we can escape the while loop 
    }

    return totalValue;
}

function endGame() {

}

// Nav links pressed to navigate to home screen / rules page
function navigateHome() {
    document.querySelector(".game-area").style.display = "none";
    document.querySelector(".end-game-screen").style.display = "none";
    document.querySelector(".betting-options").style.display = "none";

    document.querySelector(".game-rules").style.display = "block";
}