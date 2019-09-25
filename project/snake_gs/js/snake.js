window.addEventListener("load", function() {

//pictures
  var appleImg = new Image();


//audio
  var eatingFood = new Audio();
  eatingFood.src = "audio/bite.mp3";

  var backgroundMusic = new Audio();
  backgroundMusic.src = "audio/aaronsmith.mp3";

  var deathSound = new Audio();
  deathSound.src = "audio/death.mp3";

//gameState
  var gameState = 0;

//key Pressed variable
  var keyPressed;

//set score
  var score = 0;

//define apple X and Y Position
  var appleXpos;
  var appleYpos;

//movement
  var movement;

//create snake
  var snake = [];
  var oldHeadX;
  var oldHeadY;

//get the canvas element
  var canvas = document.getElementById("canvas");
  var c = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height  = 600;

//select, div, p
  var size = document.getElementById("sizeSelection");
  var speed = document.getElementById("speedSelection");
  var snake_div = document.getElementById("snake_game");
  var labelSizeSelection = document.getElementById("sizeSelectionText");
  var labelSpeedSelection = document.getElementById("speedSelectionText");
  var paragScore = document.getElementById("score");

// define Box width/height
  var box;

//setup
    drawBackground();
    drawApple(appleXpos, appleYpos);

//draw
window.addEventListener("keydown", function() {
  if (gameState == 0) {
    switch (size.value) {
      case "small": box = 30;
      appleImg.src = "pictures/large_apple.png";
      break;
      case "large": box = 15;
      appleImg.src = "pictures/small_apple.png";
      break;
    }

    switch (speed.value) {
      case "slow": setInterval(gamePlay, 120);
      break;
      case "medium": setInterval(gamePlay, 100);
      break;
      case "fast": setInterval(gamePlay, 80);
      break;
      case "sonic": setInterval(gamePlay, 50);
      break;
    }

    //define snake head
      snake[0] = {
          x : 9 * box,
          y : 10 * box
      };
      appleXpos = setRandomXpos(appleXpos);
      appleYpos = setRandomYpos(appleYpos);
      gameState = 1;
  }
  });

 function gamePlay() {
  if (gameState == 1) {

      drawBackground();
      movement = 0;

     //draw snake
     for (var i = 0; i < snake.length; i++) {
      if (i % 2 == 0) {
         c.fillStyle = "#FFB275";
       }
       else {
         c.fillStyle = "#E8906B";
       }
       c.fillRect(snake[i].x, snake[i].y, box, box);
     }

     //draw appleXpos
     drawApple(appleXpos, appleYpos);

     //old head snake Position
     oldHeadX = snake[0].x;
     oldHeadY = snake[0].y;

     //movementSnake
     window.addEventListener("keydown", snakeMovement);
     switch (keyPressed) {
       case "LEFT": oldHeadX = oldHeadX - box;
       break;
       case "UP": oldHeadY = oldHeadY - box;
       break;
       case "RIGHT": oldHeadX = oldHeadX + box;
       break;
       case "DOWN": oldHeadY = oldHeadY + box;
       break;
     }



    //remove the Tail
    // snake.pop();

     //add new snakeHead
     var newHead = {
       x : oldHeadX,
       y : oldHeadY
     }

     appleCollisionDetection();
     paragScore.innerHTML = "Your Score: " + score;
     if (gridCollisionDetection(newHead) || snakeBodyCollisionDetection(newHead, snake)) {
        gameState = 2;
     }
/*     snakeBodyCollisionDetection(newHead, snake);
     gridCollisionDetection(newHead);*/

     //adds new head to array
     snake.unshift(newHead);

     //if the apple position is the same as the snake body, new apple position
     for (var i = 0; i < snake.length; i++) {
       if (snake[i].x == appleXpos && snake[i].y == appleYpos) {
         var foodInSnake = true;

         while (foodInSnake == true) {
           appleXpos  = setRandomXpos(appleXpos);
           appleYpos = setRandomYpos(appleYpos);
           foodInSnake = false;

         }
       }
     }


   }

   if (gameState == 2) {
     deathSound.play();
     gameState = 3;
   }

   if (gameState == 3) {
     snake_div.removeChild(canvas);
     snake_div.removeChild(size);
     snake_div.removeChild(speed);
     snake_div.removeChild(labelSizeSelection);
     snake_div.removeChild(labelSpeedSelection);
     gameState = 4;
   }

   if (gameState == 4) {
     var p = document.createElement("p");
     p.innerHTML = "Game Over, wanna play again?";
     var b = document.createElement("button");
     b.innerText = "Retry!";
     b.setAttribute("class", "retry_button");
     snake_div.appendChild(p);
     snake_div.appendChild(b);
     b.addEventListener("click", function() {
       window.location = "snake.html";
     });
     gameState = 5;
}




}






/*Functions for snake game */

// drawBackground
/* Draws the grid of the snake game */
  function drawBackground() {
    var xGrid = 0;
    var yGrid = 0;
    var gridColor = 0;

    for (var gridHeight = 0; gridHeight < canvas.height / box; gridHeight++) { //Draws 1 Line for each box height
      for (var gridWidth = 0; gridWidth < canvas.width / box; gridWidth++) { // Draws 1 Line of Boxes
        if (gridColor % 2 == 0) { //If gridColor is even
          c.fillStyle = "#b8b8b8";
        } else { // If gridColor isn't even
          c.fillStyle = "#dedede";
        }
        c.fillRect(xGrid, yGrid, box, box); //Draw box
        xGrid = xGrid + box;
        gridColor++;
      }
      xGrid = 0;
      yGrid = yGrid + box;
      gridColor++;
    }
  }

// Draw Grid end

// drawApple
/* Draws the Apple */

  function drawApple(appleXpos, appleYpos) {
    c.fillStyle = "green";
    c.drawImage(appleImg, appleXpos, appleYpos);
//    c.fillRect(appleXpos, appleYpos, box, box);
  }

// Draw Apple end

//snakeMovement
/* Depending on KeyCode, the snake'll move to the pressed Key */
function snakeMovement() {
  var key = event.keyCode;

  if (key == 37 && keyPressed !== "RIGHT" && movement !== 1) { //ArrowLeft
    keyPressed = "LEFT";
    movement = 1;
  }
  else if (key == 38 && keyPressed !== "DOWN" && movement !== 1 ) { //ArrowUp
    keyPressed = "UP";
    movement = 1;
  }
  else if (key == 39 && keyPressed !== "LEFT" && movement !== 1) { //ArrowRight
    keyPressed = "RIGHT";
    movement = 1;
  }
  else if (key == 40 && keyPressed !== "UP" && movement !== 1) { //ArrowDown
    keyPressed = "DOWN";
    movement = 1;
  }
}

//snakeMovement end

// setRandomX/Ypos
/* Sets a Random x/y Position */

function setRandomXpos(randomX) {
  var randomX = parseInt(Math.random() * canvas.width / box) * box;
  return randomX;
}

function setRandomYpos(randomY) {
  var randomY = parseInt(Math.random() * canvas.height / box) * box;
  return randomY;
}

// Set Random X/Ypos end

// appleCollisionDetection

function appleCollisionDetection() {
  if (oldHeadX == appleXpos && oldHeadY == appleYpos) {
    appleXpos  = setRandomXpos(appleXpos);
    appleYpos = setRandomYpos(appleYpos);
    score = score + 1;
    eatingFood.play();
  }
  else {
    snake.pop();
  }
}

// appleCollisionDetection end

// gridCollisionDetection

  function gridCollisionDetection(array) {
    if (array.x > canvas.width - box || array.x < 0) {
      return true;
    }
    else if (array.y > canvas.height - box || array.y < 0) {
      return true;
    }
  }

// gridCollisionDetection end

// snakeBodyCollisionDetection

function snakeBodyCollisionDetection(head, snakeArray) {
  for (var i = 0; i < snakeArray.length; i++) {
    if (head.x == snakeArray[i].x && head.y == snakeArray[i].y) {
      return true;
    }
  }
}
// snakeBodyCollisionDetection end


});
