// Array to hold player information
const players = [
    { appearance: "😄", position: 0, turn: true, money: 300 },
    { appearance: "😊", position: 0, turn: false, money: 300 }
];

// Function to roll the dice and update game state
function rollDice() {
    // Find the current player and the other player
    const currentPlayer = players.find(player => player.turn);
    const otherPlayer = players.find(player => !player.turn);

    // Generate a random dice value between 1 and 6
    const diceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById("RN").textContent = "Dice was: " + diceValue;

    // Update the current player's position with wrap-around logic
    currentPlayer.position = (currentPlayer.position + diceValue) % 16;
    updateBoard(); // Update the board display
    
    if (diceValue !== 6) {
    // Switch turns after dice roll
    changeTurn();
    }
}

// Function to update the game board based on player positions
function updateBoard() {
    // Clear the board by resetting all positions
    for (let i = 0; i < 16; i++) {
        document.getElementById(i).textContent = "⚫";
    }

    // Find the current player and update their position on the board
    const currentPlayer = players.find(player => player.turn);
    document.getElementById(currentPlayer.position).textContent = currentPlayer.appearance;

    // Find the other player and update their position
    const otherPlayer = players.find(player => !player.turn);
    if (currentPlayer.position === otherPlayer.position) {
        // If both players are on the same cell, show a special symbol
        document.getElementById(otherPlayer.position).textContent = "🫂";
    } else {
        // Otherwise, show the other player's appearance
        document.getElementById(otherPlayer.position).textContent = otherPlayer.appearance;
    }
}

// Function to switch turns between players
function changeTurn() {
    const currentPlayer = players.find(player => player.turn);
    const nextPlayer = players.find(player => !player.turn);

    // Switch the turn from the current player to the next player
    currentPlayer.turn = false;
    nextPlayer.turn = true;
    document.getElementById("plyTurn_Show").textContent = "Player " + nextPlayer.appearance;
}

let amount = 0;

// Function to display the deal options
function showDealOptions() {
    document.getElementById("DSH").classList.remove("hidden");
}

// Function to adjust the deal amount
function changeAmount(delta) {
    const currentPlayer = players.find(player => player.turn);

    // Increase or decrease the amount within the player's money limits
    if (delta > 0 && amount < currentPlayer.money) {
        amount += delta;
    } else if (delta < 0 && amount > 0) {
        amount += delta;
    }

    document.getElementById("N_amount").textContent = amount;
}

// Function to deposit the money and update player balances
function deposit() {
    const currentPlayer = players.find(player => player.turn);
    const otherPlayer = players.find(player => !player.turn);

    // Deduct amount from the current player and add it to the other player
    currentPlayer.money -= amount;
    otherPlayer.money += amount;

    // Prevent negative balance for the current player
    if (currentPlayer.money < 0) {
        otherPlayer.money += currentPlayer.money;
        currentPlayer.money = 0;
    }

    updateMoneyDisplay(); // Update money display

    amount = 0; // Reset amount to 0
    document.getElementById("N_amount").textContent = amount;
    document.getElementById("DSH").classList.add("hidden"); // Hide deal options
}

// Function to update the displayed money values for both players
function updateMoneyDisplay() {
    document.getElementById("moneyofPlayer1").textContent = players[0].money;
    document.getElementById("moneyofPlayer2").textContent = players[1].money;
}
