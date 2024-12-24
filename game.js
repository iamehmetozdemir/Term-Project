const scoreValue = document.getElementById("score-value");
const livesContainer = document.getElementById("lives");
const message = document.getElementById("message");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");
const cardImages = document.querySelectorAll("input[type='image']");


let word = "UNITY"; 
let guessedLetters = [];
let score = 0;
let lives = 3;


// Initialize game
function startGame() {
    guessedLetters = [];
    score = 0;
    lives = 3;
    message.textContent = "";
    updateScore();
    updateLives();
    cardImages.visibility = "hidden";
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
if ( score === 100 ) {
    message.textContent = "You won!";
    endGame();
}
// Handle guess submission
function handleGuess() {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = "";
    restartButton.classList.remove("hidden");

    if (!guess) {
        message.textContent = "Please enter a guess.";
        return;
    }

    if (guess.length === 1) {
        if (word.includes(guess)) {
            if (!guessedLetters.includes(guess)) {
                guessedLetters.push(guess);
                score += 20;
                updateScore();
                revealLetter(guess);

                if (score === 100) {
                    message.textContent = "You won!";
                    endGame();
                    return;
                }

                if (word.split("").every(letter => guessedLetters.includes(letter))) {
                    message.textContent = "You won!";
                    endGame();
                }
            } else {
                message.textContent = "Letter already guessed.";
            }
        } else {
            lives -= 1;
            updateLives();
            if (lives === 0) {
                message.textContent = "You lost! Reset the game to try again";
                endGame();
            }
        }
    } else if (guess.length === word.length) {
        if (guess === word) {
            score = 100;
            updateScore();
            message.textContent = "You won!";
            endGame();
        }
    } else {
        lives = 0;
        updateLives();
        message.textContent = "Wrong word! You lost!";
        endGame();
    }
}
// End the game
function endGame() {
    submitButton.disabled = true;   
}

// Reset the game
function resetGame() {
    startGame();
}

// Event listeners
submitButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", resetGame);

// Initialize the game on page load
startGame();
