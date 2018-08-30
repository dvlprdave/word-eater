// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

// To change level
let currentLevel = levels.easy

let time = currentLevel
let score = 0
let isPlaying

// DOM Elements
const wordInput = document.querySelector("#word-input")
const currentWord = document.querySelector("#current-word")
const scoreDisplay = document.querySelector("#score")
const timeDisplay = document.querySelector("#time")
const message = document.querySelector("#message")
const seconds = document.querySelector("#seconds")
const easyLevel = document.querySelector("#easy-btn")
const mediumLevel = document.querySelector("#medium-btn")
const hardLevel = document.querySelector("#hard-btn")
const newGame = document.querySelector("#reset-btn")

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition"
];

// Initialize Game

function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

window.onload = () => {
  // Load word from array
  showWord(words);
}

// Initialize game on input of first letter
wordInput.addEventListener("input", function handleInput(e) {
  init();
  // Remove event after first leter is typed
  if (wordInput.value.length >= 1) {
    wordInput.removeEventListener("input", handleInput);
  }
});

// Reset Game
newGame.onclick = resetGame

function resetGame() {
  document.location.reload(true)
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }

}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (time === 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
  } 
}

//Select difficulty 
easyLevel.onclick = displayEasyDifficulty;
mediumLevel.onclick = displayMeidumDifficulty;
hardLevel.onclick = displayHardDifficulty;

function displayEasyDifficulty() {
  seconds.innerHTML = levels.easy;
  seconds.classList.remove("text-success");
  seconds.classList.add("text-warning");
  message.innerHTML = "Difficulty: Easy";
  currentLevel = levels.easy;
}

function displayMeidumDifficulty() {
  seconds.innerHTML = levels.medium;
  seconds.classList.remove("text-success")
  seconds.classList.add("text-info")
  message.innerHTML = 'Difficulty: Medium'
  currentLevel = levels.medium;
}

function displayHardDifficulty() {
  seconds.innerHTML = levels.hard;
  seconds.classList.remove("text-success");
  seconds.classList.add("text-danger");
  message.innerHTML = "Difficulty: Hard";
  currentLevel = levels.hard;
}


// mediumLevel.addEventListener('click', function handleClick(e) {
//   mediumLevel.removeEventListener('click', handleClick)
// })

// mediumLevel.addEventListener('click', function handleClick(e) {
//   currentLevel = levels.medium
// })