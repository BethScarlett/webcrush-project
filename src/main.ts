import "./Styling/main.scss";
import playerOne from "./Types & Objects/objects";

/////////Set up elements for DOM manipulation//////////
//Grab player, display, gem and movement arrows from HTML
const player = document.querySelector<HTMLImageElement>(
  ".game-display__player"
);
const gems = document.querySelectorAll<HTMLImageElement>(".game-display__gem");
const gameDisplay = document.querySelector<HTMLDivElement>(".game-display");
const gameControls = document.querySelector(".game-controls"); //TODO - Pull all elements from game controls, slice to separate arrows & buttons then work from there
const arrowButton = document.querySelectorAll(".game-controls__arrows--arrow");
const restartButton = document.querySelector<HTMLButtonElement>(
  ".game-controls__restart-button"
);

//Grab score and timer from HTML
const scoreDisplay = document.querySelector(".game-display__objectives--score");
const timeDisplay = document.querySelector(".game-display__objectives--time");

//Null Exceptions for above query selectors //TODO - Split out for better error detection
if (
  !arrowButton ||
  !gameDisplay ||
  !player ||
  !gems ||
  !scoreDisplay ||
  !timeDisplay ||
  !restartButton ||
  !gameControls
) {
  throw new Error("Issue with selectors");
}

//Set variables required for player movement
let horizontalMovement: number = Number(player.style.left);
let verticalMovement: number = Number(player.style.top);
let moveCounter: number;

//Set variables required for time
let timeLeft: number = 60;
let timeCounter: number;

//Set variables required for game state
let gameCounter: number;

//Desturcture playerOne object for easier variable access
let { score, moveSpeed } = playerOne;

//////////Game State Functions//////////
//Check game state every 50ms
const handleStartGame = () => {
  gameCounter = setInterval(() => {
    checkCollision();
    checkGameEndConditions();
    scoreDisplay.innerHTML = `Score: ${score}`;
  }, 1000); //TODO - Set timer to 50ms
};

//Check for collision between player and gems
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
      score += 1;
    }
  });
  console.log("Player score = " + playerOne.score);
};

//Check if either game end conditions have been reached
const checkGameEndConditions = () => {
  //TODO - Set score threshold as variable and compare to that
  if (playerOne.score == 2) {
    //Check if the players score has hit the goal
    handleEndGame("score");
  } else if (timeLeft == 0) {
    //Check if the time has elapsed
    handleEndGame("time");
  }
};

//Start timer and count down at a rate of 1 second per second
const updateTime = () => {
  timeCounter = setInterval(() => {
    //Only lower timer if time left is above 0
    if (timeLeft > 0) {
      timeLeft -= 1;
      timeDisplay.innerHTML = `Time Remaining: ${timeLeft}`;
      console.log(timeLeft);
    }
  }, 1000);
};

//Show result and prevent further movement
const handleEndGame = (condition: string) => {
  if (condition === "time") {
    console.log("Time up");
  } else if (condition === "score") {
    console.log("Score reached");
  }

  //Stop checking gamestate
  clearInterval(gameCounter);

  //Remove event listeners from arrows to stop movement //TODO - Look for better way of disabling movement
  arrowButton.forEach((arrow) => {
    arrow.removeEventListener("mousedown", handlePlayerMove);
    arrow.removeEventListener("mouseup", handlePlayerStop);
    arrow.removeEventListener("mouseout", handlePlayerStop);
    arrow.removeEventListener("touchstart", handlePlayerMove);
    arrow.removeEventListener("touchend", handlePlayerStop);
    arrow.removeEventListener("touchmove", handlePlayerStop);
  });

  //Restore restart button to screen
  restartButton.style.display = "block";
  restartButton.innerText = "Restart Game";
};

//Restart game
const handleGameRestart = () => {
  score = 0;
  timeLeft = 61;
  restartButton.style.display = "none";
  clearInterval(timeCounter);
  handleStartGame();
  updateTime();
  handleAddEventListeners();

  console.log(moveSpeed);
};

//////////Player Movement Functions//////////
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

//////////Event Listeners//////////
const handleAddEventListeners = () => {
  //Add event listeners onto each arrow
  arrowButton.forEach((arrow) => {
    //Adding listeners for mouse clicks
    arrow.addEventListener("mousedown", handlePlayerMove);
    arrow.addEventListener("mouseup", handlePlayerStop);
    arrow.addEventListener("mouseout", handlePlayerStop);

    //Adding listeners for touch presses (Used for mobile)
    arrow.addEventListener("touchstart", handlePlayerMove);
    arrow.addEventListener("touchend", handlePlayerStop);
    arrow.addEventListener("touchmove", handlePlayerStop);
  });
};

//Add event listerners
//Add listener to start/restart buttons
restartButton.addEventListener("click", handleGameRestart);
//Add listener to document
//document.addEventListener("DOMContentLoaded", updateTime);
