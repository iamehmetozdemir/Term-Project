
const challengeInput = document.getElementById("challenge");
const userInput = document.getElementById("user-input");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const levelElement = document.getElementById("level");
const restartBtn = document.getElementById("restart-btn");
const submitBtn = document.getElementById("submit-btn");
const letters = ["U","N","I","T","Y"];
const lives = [
    document.getElementById("life-1"),
    document.getElementById("life-2"),
    document.getElementById("life-3")
];
let score = document.getElementById("score-value").innerHTML;



function startGame(){
    score = 0;
    userInput.value="";

}

submitBtn.addEventListener("click", function() {
    restartBtn.classList.remove("hidden");
});