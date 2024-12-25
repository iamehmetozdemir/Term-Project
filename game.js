// HTML elemanlarını seçiyoruz
const scoreValue = document.getElementById("score-value");
const livesContainer = document.getElementById("lives");
const message = document.getElementById("message");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");

// Oyunda kullanılacak değişkenler
let word = "UNITY"; 
let guessedLetters = [];
let score = 0;
let lives = 3;

// Oyunu başlatan fonksiyon
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

// Skoru güncelleyen fonksiyon
function updateScore() {
  scoreValue.textContent = score;
}

// Can haklarını güncelleyen fonksiyon
function updateLives() {
  // .life sınıfına sahip tüm kalp resimlerini seç
  const heartImages = livesContainer.querySelectorAll(".life");

  // Mevcut can hakları kadar kalp görünür, kalanı gizli
  for (let i = 0; i < heartImages.length; i++) {
    if (i < lives) {
      heartImages[i].style.visibility = "visible";
    } else {
      heartImages[i].style.visibility = "hidden";
    }
  }
}

// Parametre olarak gelen harfi görünür yapan fonksiyon
function revealLetter(letter) {
  const letterElements = document.querySelectorAll(".card");
  
  for (let i = 0; i < letterElements.length; i++) {
    if (letterElements[i].alt.toUpperCase() === letter.toUpperCase()) {
      letterElements[i].style.visibility = "visible";
    }
  }
}

// Bütün harfleri gizleyen fonksiyon
function hideAllLetters() {
  const letterElements = document.querySelectorAll(".card");
  
  for (let i = 0; i < letterElements.length; i++) {
    letterElements[i].style.visibility = "hidden";
  }
}

// Oyuncu harf ya da kelime tahmini yaptığında çalışan fonksiyon
function handleGuess() {
  let guess = guessInput.value.toUpperCase();
  guessInput.value = "";

  restartButton.classList.remove("hidden"); 

  // Kullanıcı bir şey girmemişse uyarı ver
  if (!guess) {
    message.textContent = "Please enter a guess.";
    return;
  }

  // Tek harf girişi yapılmışsa
  if (guess.length === 1) {
    if (word.includes(guess)) {
      // Harf daha önce tahmin edilmemişse
      if (guessedLetters.indexOf(guess) === -1) {
        guessedLetters.push(guess);
        score += 20;
        updateScore();
        revealLetter(guess);

        // Skor 100’e ulaştıysa veya tüm harfler bilindiyse oyunu kazanırsın
        if (score === 100 || allLettersRevealed()) {
          message.textContent = "You won!";
          endGame();
          return;
        }
      } else {
        message.textContent = "Letter already guessed.";
      }
    } else {
      // Yanlış harf tahmini -> can azalt
      lives -= 1;
      updateLives();

      if (lives === 0) {
        message.textContent = "You lost! Reset the game to try again";
        endGame();
      }
    }
  }
  // Girilen tahmin kelime uzunluğuyla aynıysa (kelime tahmini)
  else if (guess.length === word.length) {
    if (guess === word) {
      score = 100;
      updateScore();
      message.textContent = "You won!";

      
      for (let i = 0; i < word.length; i++) {
        revealLetter(word[i]);
      }
      endGame();
    } else {
      lives = 0;
      updateLives();
      message.textContent = "Wrong word! You lost!";
      endGame();
    }
  }
 //guess>word.length
  else {
    lives = 0;
    updateLives();
    message.textContent = "Wrong word! You lost!";
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
