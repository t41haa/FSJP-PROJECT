const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const button = document.querySelector("#start");
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  button.style.visibility = "hidden";
  peep();
  setTimeout(() => {
    timeUp = true;
    button.innerHTML = "Try again?";
    button.style.visibility = "visible";
  }, 10000);
}

// ===== KEY CHANGE IS IN THIS FUNCTION =====
function bonk(e) {
  // This line prevents the browser from firing a 'click' event after a 'touchstart'
  // This stops the score from being counted twice on a single tap.
  e.preventDefault();

  if (!e.isTrusted) return; // ignore fake clicks
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

button.addEventListener("click", startGame);

// ===== AND THE SECOND CHANGE IS HERE =====
moles.forEach(mole => {
  mole.addEventListener("click", bonk);
  // We now ALSO listen for the 'touchstart' event for mobile devices.
  mole.addEventListener("touchstart", bonk, { passive: false });
});
