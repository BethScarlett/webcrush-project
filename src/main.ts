import "./Styling/main.scss";

const player = document.querySelector<HTMLImageElement>(
  ".game-display__player"
);
const gameDisplay = document.querySelector<HTMLDivElement>(".game-display");
const arrowButton = document.querySelector(".game-controls__arrows--arrow");

if (!arrowButton || !gameDisplay) {
  throw new Error("Error with arrows");
}

if (!player) {
  throw new Error("Error with player");
}

//TODO - Use on load to set game up and setInterval to keep track of score
window.onload = function () {
  setInterval(function () {});
};

let movement: number = 10;
let moveCounter: number;

const handlePlayerMove = () => {
  moveCounter = setInterval(() => {
    let horizontal: string = `${movement.toString()}px`;
    gameDisplay.style.backgroundColor = "green";
    player.style.left = `${horizontal}`;
    movement = movement + 30;
  }, 200);
};

const handlePlayerStop = () => {
  clearInterval(moveCounter);
};

arrowButton.addEventListener("mousedown", handlePlayerMove);
arrowButton.addEventListener("mouseup", handlePlayerStop);
