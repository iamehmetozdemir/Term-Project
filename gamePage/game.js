const scoreValue = document.getElementById("score-value");
const livesContainer = document.getElementById("lives");
const message = document.getElementById("message");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");


let word = "UNITY"; 
let guessedLetters = [];
let score = 0;
let lives = 3;


function startGame() {
  guessedLetters = [];
  score = 0;
  lives = 3;
  message.textContent = "";

  updateScore();
  updateLives();
  hideAllLetters();

  guessInput.value = "";
  restartButton.classList.add("hidden");
  submitButton.disabled = false;
}


function updateScore() {
  scoreValue.textContent = score;
}


function updateLives() {
 
  const heartImages = livesContainer.querySelectorAll(".life");

  
  for (let i = 0; i < heartImages.length; i++) {
    if (i < lives) {
      heartImages[i].style.visibility = "visible";
    } else {
      heartImages[i].style.visibility = "hidden";
    }
  }
}


function revealLetter(letter) {
  const letterElements = document.querySelectorAll(".card");
  
  for (let i = 0; i < letterElements.length; i++) {
    if (letterElements[i].alt.toUpperCase() === letter.toUpperCase()) {
      letterElements[i].style.visibility = "visible";
    }
  }
}


function hideAllLetters() {
  const letterElements = document.querySelectorAll(".card");
  
  for (let i = 0; i < letterElements.length; i++) {
    letterElements[i].style.visibility = "hidden";
  }
}


function handleGuess() {
  let guess = guessInput.value.toUpperCase();
  guessInput.value = "";

  restartButton.classList.remove("hidden"); 

 
  if (!guess) {
    message.textContent = "Please enter a guess.";
    return;
  }

  
  if (guess.length === 1) {
    if (word.includes(guess)) {
      
      if (guessedLetters.indexOf(guess) === -1) {
        guessedLetters.push(guess);
        score += 20;
        updateScore();
        revealLetter(guess);

        
        if (score === 100 || allLettersRevealed()) {
          alert("You won! Please press 'Reset the Game' to play again.");
          endGame();
          return;
        }
      } else {
        message.textContent = "Letter already guessed.";
      }
    } else {

      lives -= 1;
      updateLives();

      if (lives === 0) {
        alert("You lost! Please press 'Reset the Game' to play again.");
        endGame();
      }
    }
  }
  
  else if (guess.length === word.length) {
    if (guess === word) {
      score = 100;
      updateScore();
      alert("Congratulations! You guessed the word! Please press 'Reset the Game' to play again.");
      
      for (let i = 0; i < word.length; i++) {
        revealLetter(word[i]);
      }
      endGame();
    } else {
      lives = 0;
      updateLives();
      alert("Wrong word! You lost! Please press 'Reset the Game' to play again.");
      endGame();
    }
  }
 
  else {
    lives = 0;
    updateLives();
    alert("Wrong word! You lost! Please press 'Reset the Game' to play again.");
    endGame();
  }
}


function allLettersRevealed() {
  for (let i = 0; i < word.length; i++) {
    if (guessedLetters.indexOf(word[i]) === -1) {
      return false;
    }
  }
  return true;
}


function endGame() {
  submitButton.disabled = true;
}


submitButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", startGame);


startGame();
