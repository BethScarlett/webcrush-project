import "./Styling/main.scss";
import playerOne from "./Types & Objects/objects";

/////////Set up elements for DOM manipulation//////////
//Grab game display elements from HTML
const player = document.querySelector<HTMLImageElement>(
  ".game-display__player"
);
const gems = document.querySelectorAll<HTMLImageElement>(".game-display__gem");
const scoreDisplay = document.querySelector(".game-display__objectives--score");
const timeDisplay = document.querySelector(".game-display__objectives--time");
const gameplayArea = document.querySelector<HTMLDivElement>(".game-display");
const resultsDisplay = document.querySelector<HTMLHeadingElement>(
  ".game-display__information--title"
);
const startButton = document.querySelector<HTMLButtonElement>(
  ".game-display__information--restart-button"
);

//Grab game control elements from HTML
const gameControls = document.querySelector(".game-controls"); //TODO - Pull all elements from game controls, slice to separate arrows & buttons then work from there
const arrowButtons = document.querySelectorAll(".game-controls__arrows--arrow");

//Null Exceptions for game display elements
if (
  !player ||
  !gems ||
  !scoreDisplay ||
  !timeDisplay ||
  !gameplayArea ||
  !resultsDisplay ||
  !startButton
) {
  throw new Error("Error with game display elements");
}

//Null Exceptions for game control elements
if (!gameControls || !arrowButtons) {
  throw new Error("Error with game controls");
}

//////////Setting variables//////////
//Set variables required for player movement
let horizontalMovement: number = Number(player.style.left);
let verticalMovement: number = Number(player.style.top);
let moveCounter: number;

//Set variable requires for score
let scoreTarget: number = 2;

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
  handleRestartGame();
  updateTime();
  gameCounter = setInterval(() => {
    checkCollision();
    checkGameEndConditions();
    scoreDisplay.innerHTML = `Score: ${score}`;
  }, 50);
};

//Start timer and count down at a rate of 1 second per second
const updateTime = () => {
  timeCounter = setInterval(() => {
    //Only lower timer if time left is above 0
    if (timeLeft > 0) {
      timeLeft -= 1;
      timeDisplay.innerHTML = `Time Remaining: ${timeLeft}`;
    }
  }, 1000);
  console.log("Time counter: " + timeCounter);
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
      //Remove the collided with gem and increment score
      gem.remove();
      gem.width = 0;
      gem.height = 0;
      score += 1;
    }
  });
};

//Check if either game end conditions have been reached
const checkGameEndConditions = () => {
  if (score == scoreTarget) {
    handleEndGame("score");
  } else if (timeLeft == 0) {
    handleEndGame("time");
  }
};

//Show result and prevent further movement
const handleEndGame = (condition: string) => {
  //Bring up results screen and set based on end game condition
  resultsDisplay.style.display = "block";
  if (condition === "score") {
    resultsDisplay.innerText = "You Win";
  } else if (condition === "time") {
    resultsDisplay.innerText = "You Lose";
  }

  //Stop checking gamestate & updating time
  clearInterval(gameCounter);
  clearInterval(timeCounter);

  //Remove event listeners from arrows to stop movement
  arrowButtons.forEach((arrow) => {
    arrow.removeEventListener("mousedown", handlePlayerMove);
    arrow.removeEventListener("mouseup", handlePlayerStop);
    arrow.removeEventListener("mouseout", handlePlayerStop);
    arrow.removeEventListener("touchstart", handlePlayerMove);
    arrow.removeEventListener("touchend", handlePlayerStop);
    arrow.removeEventListener("touchmove", handlePlayerStop);
  });

  //Restore restart button to screen
  startButton.style.display = "block";
  startButton.innerText = "Restart Game";
};

//Restart game
const handleRestartGame = () => {
  score = 0;
  timeLeft = 61;
  resultsDisplay.style.display = "none";
  startButton.style.display = "none";
  handleAddEventListeners();
  console.log(moveSpeed);
};

//////////Player Movement Functions//////////
//Increment player movement based on arrow clicked
const handlePlayerMove = (event: Event) => {
  //Get the arrow clicked and cast it to pull out id
  const getArrow = event.target as HTMLImageElement;
  const getId = getArrow.id;

  //Use set interval to run switch statement, which is based on arrow id, every 50ms and increment player position
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
  arrowButtons.forEach((arrow) => {
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

//Add listener to start/restart button
startButton.addEventListener("click", handleStartGame);
//Add listener to document
//document.addEventListener("DOMContentLoaded", updateTime);
