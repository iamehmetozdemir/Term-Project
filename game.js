// Word Prediction Game Implementation

// Variables for game state
let word = "UNITY"; // Replace with the correct word based on student number
let guessedLetters = [];
let score = 0;
let lives = 3;

// DOM Elements
const scoreValue = document.getElementById("score-value");
const livesContainer = document.getElementById("lives");
const message = document.getElementById("message");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");
const cardImages = document.querySelectorAll("input[type='image']");

// Initialize game
function initializeGame() {
    guessedLetters = [];
    score = 0;
    lives = 3;
    message.textContent = "";
    updateScore();
    updateLives();

    guessInput.value = "";
    restartButton.classList.add("hidden");
    submitButton.disabled = false;
}

// Update score display
function updateScore() {
    scoreValue.textContent = score;
}

// Update lives display
function updateLives() {
    const heartImages = livesContainer.querySelectorAll(".life");
    heartImages.forEach((img, index) => {
        img.style.visibility = index < lives ? "visible" : "hidden";
    });
}

// Handle guess submission

// End the game
function endGame() {
    submitButton.disabled = true;
    restartButton.classList.remove("hidden");
}

// Reset the game
function resetGame() {
    initializeGame();
}

// Event listeners
submitButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", resetGame);

// Initialize the game on page load
initializeGame();
