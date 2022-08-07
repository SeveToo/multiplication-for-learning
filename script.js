const timeFill = document.querySelector(".timeFill");
const nr1 = document.querySelector(".nr1");
const nr2 = document.querySelector(".nr2");
const correct = document.querySelector(".correct .value");
const wrong = document.querySelector(".wrong .value");
const options = document.querySelector(".options button");
const restart = document.querySelector(".restart");
const InputBox = document.querySelector(".InputBox input");
const body = document.querySelector("body");
const menu = document.querySelector(".menu");
const optionButtons = document.querySelectorAll(".option");

let secPerRound = 5;
let availableNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let num1, num2;
let correctCounter = 0;
let wrongCounter = 0;
let correctAnswerIs;
let optionsIsClosed = true;
let isWorking = true;
let animationOfLoading;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomNumbers() {
  num1 = availableNumbers[rand(0, availableNumbers.length - 1)];
  num2 = availableNumbers[rand(0, availableNumbers.length - 1)];
  correctAnswerIs = num1 * num2;
  nr1.textContent = num1;
  nr2.textContent = num2;
}

function restartPoints() {
  correctCounter = 0;
  wrongCounter = 0;
  updatePoints();
}

function updatePoints() {
  correct.textContent = correctCounter;
  wrong.textContent = wrongCounter;
}

function inputFocus() {
  InputBox.focus();
}

function stopDisplayCounting() {
  clearInterval(animationOfLoading);
}

function startDisplayCounting() {
  let i = 0;
  animationOfLoading = setInterval(() => {
    timeFill.style.width = `${i}%`;
    if (!isWorking) clearInterval(animationOfLoading);
    if (i == 100) {
      clearInterval(animationOfLoading);
      checkAnswer();
      startDisplayCounting();
    }
    i++;
  }, (secPerRound * 1000) / 100);
  // if (!isWorking) clearInterval(animationOfLoading);
  console.log(isWorking);
}

function startGame() {
  stopDisplayCounting();
  randomNumbers();
  restartPoints();
  inputFocus();
  startDisplayCounting();
}
startGame();

restart.onclick = () => {
  startGame();
};

function nextRound() {
  stopDisplayCounting();
  randomNumbers();
  inputFocus();
  startDisplayCounting();
  InputBox.value = "";
}

function checkAnswer() {
  if (InputBox.value != correctAnswerIs) wrongCounter++;
  else correctCounter++;
  stopDisplayCounting();
  updatePoints();
  nextRound();
}

body.addEventListener("keydown", function (el) {
  if (el.key == "Enter" && InputBox.value != "") checkAnswer();
});

optionButtons.forEach((option) => {
  option.addEventListener("click", (el) => {
    secPerRound = el.target.textContent.slice(0, -1);
    optionButtons.forEach((option) => {
      option.classList.remove("selected");
    });
    el.target.classList.add("selected");
  });
});

options.addEventListener("click", () => {
  if (optionsIsClosed) {
    stopDisplayCounting();
    menu.classList.remove("optionsClosed");
    optionsIsClosed = false;
  } else {
    menu.classList.add("optionsClosed");
    optionsIsClosed = true;
    console.log(0.06 * secPerRound);
    timeFill.style.transition = `${0.06 * secPerRound}s`;
    startGame();
  }
});
