import "./Styling/main.scss";

//Grab player, display and movement arrows from HTML
const player = document.querySelector<HTMLImageElement>(
  ".game-display__player"
);
const gameDisplay = document.querySelector<HTMLDivElement>(".game-display");
const arrowButton = document.querySelectorAll(".game-controls__arrows--arrow");

//Null Exceptions for above query selectors
if (!arrowButton || !gameDisplay || !player) {
  throw new Error("Issue with selectors");
}

//TODO - Use on load to set game up and setInterval to keep track of score
window.onload = function () {
  setInterval(function () {});
};

//Set variables required for player movement
let horizontalMovement: number = Number(player.style.left);
let verticalMovement: number = Number(player.style.top);
let moveCounter: number;

//Increment player movement based on arrow clicked
const handlePlayerMove = (event: Event) => {
  //Get the arrow clicked and cast it to pull out id
  const getArrow = event.target as HTMLImageElement;
  const getId = getArrow.id;

  //Use set interval to run switch statement, which is based on arrow id, every x seconds and increment player position
  moveCounter = setInterval(() => {
    switch (getId) {
      case "up": {
        if (verticalMovement > 0) {
          verticalMovement = verticalMovement - 30;
        }
        break;
      }
      case "down": {
        if (verticalMovement < 500) {
          verticalMovement = verticalMovement + 30;
        }
        break;
      }
      case "left": {
        if (horizontalMovement > 0) {
          horizontalMovement = horizontalMovement - 30;
        }
        break;
      }
      case "right": {
        if (horizontalMovement < screen.width) {
          horizontalMovement = horizontalMovement + 30;
        }
        break;
      }
    }
    let vertical: string = `${verticalMovement.toString()}px`;
    player.style.top = `${vertical}`;
    let horizontal: string = `${horizontalMovement.toString()}px`;
    player.style.left = `${horizontal}`;
  }, 50);
};

//Clear moveCounter to stop player from moving when arrow is released
const handlePlayerStop = () => {
  clearInterval(moveCounter);
};

//Add event listerners onto each arrow
arrowButton.forEach((arrow) => {
  //Adding listeners for mouse clicks
  arrow.addEventListener("mousedown", handlePlayerMove);
  arrow.addEventListener("mouseup", handlePlayerStop);
  arrow.addEventListener("mouseout", handlePlayerStop);

  //Adding listeners for touch presses
  arrow.addEventListener("touchstart", handlePlayerMove);
  arrow.addEventListener("touchend", handlePlayerStop);
  arrow.addEventListener("touchmove", handlePlayerStop);
});
