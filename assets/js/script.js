// Global variables
const suits = ['h', 'd', 'c', 's'];
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '01'];

const deck = [];
const playersHand = [];
const dealersHand = [];
let currentBet = 0; 
let playerChips = 3000;
let currentCardIndex = 4;

let multiplier = 1;
let multiplier2 = 1;

let dealerMultiplier = 1;
let dealerMultiplier2 = 1;

let winner = "";

// Add event listener to betting chips
let chips = document.querySelectorAll('.chip');

chips.forEach(chip => {
    chip.addEventListener('click', (event) => handleBet(event));
});

document.querySelector('.all-in-button').addEventListener('click', (event) => handleBet(event));

// Creates the deck of cards
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

// Adds event listeners to buttons
const hitButton = document.querySelector(".hit");
const standButton = document.querySelector(".stand");

hitButton.addEventListener("click", hit);
standButton.addEventListener("click", stand);


const placeBetButton = document.querySelector(".place-bet-button");
placeBetButton.addEventListener("click", function() {
    if(currentBet == 0){
        alert("Please place a bet");
    } else {
        betPlaced();
    }
});

const playGameLink = document.querySelector(".nav-links:nth-child(2) a");
updatePlayGameLink(playGameLink);

function updatePlayGameLink(linkElement) {
    if (playerChips !== 3000) {
        linkElement.textContent = "Reset Game";
    } else {
        linkElement.textContent = "Play Game";
    }
}

document.addEventListener("chipCountUpdated", function() {
    updatePlayGameLink(playGameLink);
});

document.addEventListener("DOMContentLoaded", function() {
    

    // When the start button is pressed the startGame function is called
    const startButton =  document.querySelector(".play-button");
    if(startButton) {
        startButton.addEventListener("click", function() {
            if(currentBet > 0) {
                
                document.querySelector(".game-rules").style.display = "none";
                document.querySelector(".game-area").style.display = "block";
                document.querySelector(".betting-options").style.display = "none";
                document.querySelector(".end-game-screen").style.display = "none";
            } else {
                startGame();
            }
        });
    } else {
        alert('Start button not found');
    }

});

/**
 * Start a new game, resetting player chips and current bet.
 * 
 * @param {Event} event - The event object generated by clicking the "Let's Play" button.
 */
function startGame(event) {
    if(event) {
        event.preventDefault();
    }

    playerChips = 3000;
    currentBet = 0;

    updateChipCount(playerChips);
    let playersBet = document.querySelector(".your-bet");
    playersBet.textContent = "Your bet: 0";

    document.querySelector(".game-rules").style.display = "none";
    document.querySelector(".game-area").style.display = "none";
    document.querySelector(".end-game-screen").style.display = "none";

    const bettingOptions = document.querySelector(".betting-options");
    bettingOptions.style.display = "block";
}

/**
 * Handle the bet placed by the player.
 * 
 * @param {Event} e - The event object generated by clicking a chip button.
 */
function handleBet(e) {
    let amount = parseInt(e.target.value);

    updateChipCount(playerChips);

    // Stops the user betting more than they have
    if (playerChips >= amount) {
        currentBet += amount;
        playerChips -= amount;
    } else {
        currentBet += playerChips;
        playerChips = 0;

        alert("You are All-in!");
    }

    updateChipCount(playerChips);

    const betAmountElement = document.querySelector(".your-bet");
    betAmountElement.textContent = `Your bet: ${currentBet}`;

}

/**
 * Reset the current bet and add the previous bet amount back to player's chips.
 */
function resetBet() {
    playerChips += currentBet;
    currentBet = 0;

    let yourBetElement = document.querySelector(".your-bet");
    yourBetElement.textContent = `Your bet: ${currentBet}`;
    let yourChipsElement = document.querySelector(".your-chips");
    yourChipsElement.textContent = `Your chips: ${playerChips}`;
}

/**
 * Update the chip count displayed on the UI.
 * 
 * @param {number} chips - The number of chips to be displayed.
 */
function updateChipCount(chips) {
    const chipCountElement = document.querySelector(".your-chips");
    chipCountElement.textContent = `Your chips: ${chips}`;
    document.dispatchEvent(new Event("chipCountUpdated"));
}

/**
 * After placing a bet, display the game area and prepare for dealing cards.
 */
function betPlaced() {
    document.querySelector(".betting-options").style.display = "none";
    document.querySelector(".game-area").style.display = "block";

    const chipCountElement = document.querySelector(".the-pot");
    chipCountElement.textContent = `${currentBet}` * 2;

    const playerChipCount = document.querySelector(".player-chips");
    playerChipCount.textContent = `Your chips: ${playerChips}`;

    dealCards();
}

/**
 * Deal cards to players and dealers at the beginning of the game.
 */
function dealCards() {
    shuffleCards();
    const card1 = document.querySelector(".card1");
    const card3 = document.querySelector(".card3");
    const card4 = document.querySelector(".card4");

    // Sets the relevant cards to the player and dealer within the UI
    card1.src = deck[0].imageUrl;
    card3.src = deck[2].imageUrl;
    card4.src = deck[3].imageUrl;

    card1.alt = deck[0].value;
    card3.alt = deck[2].value;
    card4.alt = deck[3].value;

    dealersHand.push(deck[0]);
    playersHand.push(deck[2]);
    playersHand.push(deck[3]);

}

/**
 * Shuffles the deck to ensure a random dealing of cards
 */
function shuffleCards() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

/**
 * Hit: Add a new card to the player's hand, check for bust, and update the UI.
 */
function hit() {
    const playersHandDiv = document.querySelector(".players-hand");
    const playerCards = playersHandDiv.querySelectorAll(".card");

    playersHand.push(deck[currentCardIndex]);

    // creates a new img element to display the new card within the UI.
    const newCard = document.createElement("img");
    newCard.alt = `${deck[currentCardIndex].value}`;
    newCard.src = deck[currentCardIndex].imageUrl;

    newCard.style.zIndex = currentCardIndex;
    newCard.style.position = "absolute";

    // Adds relevant styles according to the number of cards in the players hand.
    if (currentCardIndex === 4) {
        let card4 = document.querySelector(".card4");
        card4.style.left = "20px";
    }

    if (currentCardIndex < 9 ){
        newCard.className = `card flip-in-ver-right card${currentCardIndex + 1}`;
        newCard.style.left = 20 + (multiplier * 20) + "px";
        multiplier++;

        playersHandDiv.appendChild(newCard);

    } 
    // If the player has more than 6 cards the cards start a new row.
    else if (currentCardIndex === 9) {
        playersHandDiv.style.height = "75px";

        for (let i = 0; i < playerCards.length; i++){
            playerCards[i].style.width = "50px";
        }

        newCard.className = `new-card flip-in-ver-right card${currentCardIndex + 1}`;

        const newDiv = document.createElement("div");
        newDiv.className = "players-hand2";
        newDiv.appendChild(newCard);

        const parent = playersHandDiv.parentNode;
        const thirdFromLastChild = parent.childNodes[7];
        parent.insertBefore(newDiv, thirdFromLastChild.nextSibling);

    } else {
        const playersHandDiv2 = document.querySelector(".players-hand2");

        newCard.className = `new-card flip-in-ver-right card${currentCardIndex + 1}`;
        newCard.style.left = 10 + (multiplier2 * 20) + "px";
        multiplier2++;

        playersHandDiv2.appendChild(newCard);

    }

    currentCardIndex++;

    const value = getHandValue(playersHand);

    // Calculates if the player has bust.
    if (value > 21) {
        
        let playerBust = document.querySelector(".player-bust");
        playerBust.style.display = "block";
        stand();
    }
}


/**
 * Stand: Finish the player's turn, initiate dealer's turn, and determine the winner.
 */
async function stand() {

    const hitButton = document.querySelector(".hit");
    const standButton = document.querySelector(".stand");
    hitButton.style.display = "none";
    standButton.style.display = "none";

    // Awaits the dealersTurn to avoid running the functions below until it has finished.
    let dealerValue = await dealersTurn();
    let playerValue = getHandValue(playersHand);
    
    winner = determineWinner(dealerValue, playerValue);
    
    resultsPage(winner);

}

/**
 * Simulate the dealer's turn, hitting or standing based on a random hit threshold.
 * 
 * @returns {number} - The total value of the dealer's hand after completing their turn.
 */
async function dealersTurn() {

    const dealersHitMax = Math.floor(Math.random() * 3) + 15;

    // Waits 1.5 seconds to turn the dealers second card
    await new Promise(resolve => setTimeout(() => {
        const card2 = document.querySelector(".card2");
        card2.src = deck[1].imageUrl;
        dealersHand.push(deck[1]);
        resolve();
    }, 1500));
    
    let value = getHandValue(dealersHand);

    // The while loop states that the dealer will hit if still below the dealersHitMax variable or 21
    while (value < dealersHitMax && value <= 21) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const dealersHandDiv = document.querySelector(".dealers-hand");

        const newDealerCard = document.createElement("img");
        newDealerCard.alt = `${deck[currentCardIndex].value}`;
        newDealerCard.src = deck[currentCardIndex].imageUrl;

        newDealerCard.style.zIndex = currentCardIndex;
        newDealerCard.style.position = "absolute";

        // Creates a second row if the dealer has more than 6 cards
        if (dealersHand.length === 2) {
            let card2 = document.querySelector(".card2");
            card2.style.left = "20px";
        }
    
        if (dealersHand.length < 6 ){
            newDealerCard.className = `card flip-in-ver-right card${currentCardIndex + 1}`;
            newDealerCard.style.left = 20 + (dealerMultiplier * 20) + "px";
            dealerMultiplier++;
    
            dealersHandDiv.appendChild(newDealerCard);
    
        } else if (dealersHand.length === 6) {
            dealersHandDiv.style.height = "75px";
            const dealerCards = dealersHandDiv.querySelectorAll(".card");
            for (let i = 0; i < dealerCards.length; i++){
                dealerCards[i].style.width = "50px";
            }
    
            newDealerCard.className = `new-card flip-in-ver-right card${currentCardIndex + 1}`;
    
            const newDiv = document.createElement("div");
            newDiv.className = "dealers-hand2";
            newDiv.appendChild(newDealerCard);
    
            const parent = dealersHandDiv.parentNode;
            const thirdFromLastChild = parent.childNodes[3];
            parent.insertBefore(newDiv, thirdFromLastChild.nextSibling);
    
        } else {
            const dealersHandDiv2 = document.querySelector(".dealers-hand2");
    
            newDealerCard.className = `new-card flip-in-ver-right card${currentCardIndex + 1}`;
            newDealerCard.style.left = 10 + (dealerMultiplier2 * 20) + "px";
            dealerMultiplier2++;
    
            dealersHandDiv2.appendChild(newDealerCard);
    
        }
        dealersHand.push(deck[currentCardIndex]);

        currentCardIndex++;
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        value = getHandValue(dealersHand);
    }

    if (value > 21) {
        let dealerBust = document.querySelector(".dealer-bust");
        dealerBust.style.display = "block";
    }

    return value;
}

/**
 * Determine the winner of the game based on the hand values.
 * 
 * @param {number} dealerValue - The total value of the dealer's hand.
 * @param {number} playerValue - The total value of the player's hand.
 * @returns {string} - The winner of the game ("player", "dealer", or "tie").
 */
function determineWinner(dealerValue, playerValue) {
    if (playerValue > 21) {
        return "dealer";
    } else if (dealerValue > 21) {
        return "player";
    } else {
        if (playerValue > dealerValue) {
            return "player";
        } else if (playerValue < dealerValue) {
            return "dealer";
        } else {
            return "tie";
        }
    }
}

/**
 * Calculate the total value of the cards in a hand, considering Aces as 1 or 11.
 * 
 * @param {Array} hand - An array of card objects representing the player's or dealer's hand.
 * @returns {number} - The total value of the hand.
 */
function getHandValue(hand) {
    let totalValue = 0;
    let numberOfAces = 0;

    for (let card of hand) {
        const value = parseInt(card.value) > 10 ? 10 : parseInt(card.value);
        totalValue += value;

        if (value === 1) {
            numberOfAces++;
        }
    }

    while (numberOfAces > 0 && totalValue + 10 <= 21) {
        totalValue += 10; 
        numberOfAces--; 
    }

    return totalValue;
}

/**
 * Display the results of the game and handle the next hand or end of game.
 * 
 * @param {string} winner - The winner of the game ("player", "dealer", or "tie").
 */
function resultsPage(winner) {
    const endGameScreen = document.querySelector(".end-game-screen");
    const outcomeTitle = endGameScreen.querySelector(".outcome-title");
    const nextHandButton = endGameScreen.querySelector(".next-hand-button");
    const endGameChips = endGameScreen.querySelector(".end-game-chips");

    // Displays different text depending on the outcome.
    if (winner === "player") {
        outcomeTitle.textContent = "You win!";
        playerChips += (currentBet * 2);

        endGameChips.textContent = `Your Chips: ${playerChips}`;
    } else if (winner === "dealer") {
        if(playerChips === 0){
            nextHandButton.textContent = "Reset Game";
            outcomeTitle.textContent = "Game Over";
            endGameChips.textContent = 'Out of Chips!!';
        } else {
            outcomeTitle.textContent = "Dealer wins!";
            endGameChips.textContent = `Your Chips: ${playerChips}`;
        }
    } else {
        outcomeTitle.textContent = "It's a tie!";
        playerChips += currentBet;
        endGameChips.textContent = `Your Chips: ${playerChips}`;
    }

    const betAmountElement = document.querySelector(".your-bet");
    betAmountElement.textContent = 'Your bet: 0';

    updateChipCount(playerChips);

    // resets global variables.
    currentCardIndex = 4;
    currentBet = 0;
    multiplier = 1;
    multiplier2 = 1;
    dealerMultiplier = 1;
    dealerMultiplier2 = 1;

    endGameScreen.style.display = "block";

    nextHandButton.addEventListener("click", function() {
        if (playerChips > 0) {
            nextHand();
        } else {
            resetGame();
        }
    });
}

/**
 * Start a new hand after completing the current one.
 */
function nextHand() {
    // Resets game area UI
    const endGameScreen = document.querySelector(".end-game-screen");

    let dealerBust = document.querySelector(".dealer-bust");
    dealerBust.style.display = "none";
    let playerBust = document.querySelector(".player-bust");
    playerBust.style.display = "none";

    endGameScreen.style.display = "none";
    document.querySelector(".game-area").style.display = "none";

    // Places game controls back.
    const hitButton = document.querySelector(".hit");
    const standButton = document.querySelector(".stand");
    hitButton.style.display = "inline";
    standButton.style.display = "inline";

    // Resets cards
    const cardBackUrl = "./assets/images/card-back.webp";
    const cardClasses = ["card1", "card2", "card3", "card4"];
    cardClasses.forEach(className => {
        const cardElement = document.querySelector(`.${className}`);
        cardElement.src = cardBackUrl;
    });
    let card4 = document.querySelector(".card4");
    let card2 = document.querySelector(".card2");
    card4.style.left = "105px";
    card2.style.left = "105px";
    const allCards = document.querySelectorAll(".card, .new-card");
    allCards.forEach(card => {
        if (!cardClasses.some(className => card.classList.contains(className))) {
            card.parentNode.removeChild(card);
        }
    });

    playersHand.length = 0;
    dealersHand.length = 0;


    document.querySelector(".betting-options").style.display = "block";
}

/**
 * Reset the game to its initial state.
 */
function resetGame() {
    // removes bust text if it exists.
    let dealerBust = document.querySelector(".player-bust");
    dealerBust.style.display = "none";
    let playerBust = document.querySelector(".player-bust");
    playerBust.style.display = "none";

    // Places the hit and stand buttons back.
    const hitButton = document.querySelector(".hit");
    const standButton = document.querySelector(".stand");
    hitButton.style.display = "inline";
    standButton.style.display = "inline";

    // Resets cards
    const cardBackUrl = "./assets/images/card-back.webp";
    const cardClasses = ["card1", "card2", "card3", "card4"];
    cardClasses.forEach(className => {
        const cardElement = document.querySelector(`.${className}`);
        cardElement.src = cardBackUrl;
    });
    const allCards = document.querySelectorAll(".card, .new-card");
    allCards.forEach(card => {
        if (!cardClasses.some(className => card.classList.contains(className))) {
            card.parentNode.removeChild(card);
        }
    });

    playersHand.length = 0;
    dealersHand.length = 0;

    startGame();
}


/**
 * Navigate back to the home screen or rules page.
 */
function navigateHome() {
    document.querySelector(".game-area").style.display = "none";
    document.querySelector(".end-game-screen").style.display = "none";
    document.querySelector(".betting-options").style.display = "none";

    document.querySelector(".game-rules").style.display = "block";
}