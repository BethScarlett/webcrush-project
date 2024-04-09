import "./Styling/main.scss";
import playerOne from "./Types & Objects/objects";

//Grab player, display, gem and movement arrows from HTML
const player = document.querySelector<HTMLImageElement>(
  ".game-display__player"
);
const gems = document.querySelectorAll<HTMLImageElement>(".game-display__gem");
const gameDisplay = document.querySelector<HTMLDivElement>(".game-display");
const arrowButton = document.querySelectorAll(".game-controls__arrows--arrow");

//Grab score and timer from HTML
const scoreDisplay = document.querySelector(".game-display__objectives--score");
const timeDisplay = document.querySelector(".game-display__objectives--time");

//Null Exceptions for above query selectors
if (
  !arrowButton ||
  !gameDisplay ||
  !player ||
  !gems ||
  !scoreDisplay ||
  !timeDisplay
) {
  throw new Error("Issue with selectors");
}

//Set variables required for player movement
let horizontalMovement: number = Number(player.style.left);
let verticalMovement: number = Number(player.style.top);
let moveCounter: number;

//Set variables required for time
let timeLeft: number = 60;

//Function to check game state every 50ms
setInterval(() => {
  checkCollision();
  checkGameEndConditions();
}, 5000); //TODO - Set timer to 50ms

//Functions to be checked every 50ms
const checkCollision = () => {
  //Gets the player position on x and y axis and add width + height respectively
  const playerPosition: number[] = [
    player.x + player.width,
    player.y + player.height,
  ];

  //Check if each gem is colliding with the player
  gems.forEach((gem) => {
    const gemPosition: number[] = [gem.x + gem.width, gem.y + gem.height];
    if (
      //Check if player and gem are colliding on x and y axis
      player.x < gemPosition[0] &&
      playerPosition[0] > gem.x &&
      player.y < gemPosition[1] &&
      playerPosition[1] > gem.y
    ) {
      //Remove collided with gem and increment score
      gem.remove();
      gem.width = 0;
      gem.height = 0;
      playerOne.score += 1;
      scoreDisplay.innerHTML = `Score: ${playerOne.score}`;
    }
  });
  console.log("Player score = " + playerOne.score);
};

const updateTime = () => {
  setInterval(() => {
    if (timeLeft > 0) {
      timeLeft -= 1;
      timeDisplay.innerHTML = `Time Remaining: ${timeLeft}`;
      console.log(timeLeft);
    }
  }, 1000);
};

const checkGameEndConditions = () => {
  //Check if the players score has hit the goal
  //Check if the time has elapsed
};

//TODO - Remove below console logs from code (keeping incase needed)
//Get position data for player and gem
// console.log(player.getBoundingClientRect());
// console.log(gem.getBoundingClientRect());

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

//Add event listerners
//Add listeners onto each arrow
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

//Add listener to document
document.addEventListener("DOMContentLoaded", updateTime);
