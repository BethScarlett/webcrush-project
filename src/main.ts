import "./Styling/main.scss";

const player = document.querySelector<HTMLImageElement>(
  ".game-display__player"
);
const gameDisplay = document.querySelector<HTMLDivElement>(".game-display");
const arrowButton = document.querySelectorAll(".game-controls__arrows--arrow");

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

let horizontalMovement: number = Number(player.style.left);
let verticalMovement: number = Number(player.style.top);
let moveCounter: number;

const handlePlayerMove = (event: Event) => {
  const getArrow = event.target as HTMLImageElement;
  const getId = getArrow.id;

  gameDisplay.style.backgroundColor = "green";

  moveCounter = setInterval(() => {
    switch (getId) {
      case "up": {
        verticalMovement = verticalMovement - 30;
        let vertical: string = `${verticalMovement.toString()}px`;
        player.style.top = `${vertical}`;
        break;
      }
      case "down": {
        verticalMovement = verticalMovement + 30;
        let vertical: string = `${verticalMovement.toString()}px`;
        player.style.top = `${vertical}`;
        break;
      }
      case "left": {
        horizontalMovement = horizontalMovement - 30;
        let horizontal: string = `${horizontalMovement.toString()}px`;
        player.style.left = `${horizontal}`;
        break;
      }
      case "right": {
        horizontalMovement = horizontalMovement + 30;
        let horizontal: string = `${horizontalMovement.toString()}px`;
        console.log(horizontal);
        player.style.left = `${horizontal}`;
        break;
      }
    }
  }, 200);
};

const handlePlayerStop = () => {
  clearInterval(moveCounter);
};

arrowButton.forEach((arrow) => {
  arrow.addEventListener("mousedown", handlePlayerMove);
  arrow.addEventListener("mouseup", handlePlayerStop);
  arrow.addEventListener("mouseout", handlePlayerStop);
});
