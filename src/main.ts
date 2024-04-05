import "./Styling/main.scss";

const player = document.querySelector<HTMLImageElement>(
  ".game-display__player"
);
const gameDisplay = document.querySelector(".game-display");
const arrowButton = document.querySelector(".game-controls__arrows--arrow");

if (!arrowButton || !gameDisplay) {
  throw new Error("Error with arrows");
}

if (!player) {
  throw new Error("Error with player");
}

const handlePlayerMove = () => {
  console.log("Moving");
};

arrowButton.addEventListener("click", handlePlayerMove);
