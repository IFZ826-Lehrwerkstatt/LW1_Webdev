window.addEventListener("load", function() {

  //**constants**
  const canvas = document.getElementById('canvas');
  const c = canvas.getContext("2d");

  const sizeSelect = document.getElementById("selectSize");
  const speedSelect = document.getElementById("selectSpeed");
  const scoreboard = document.getElementById("score");

  //**Variabels**
  box = 0;

  var gamestate = 0;

  var snakeX;
  var snakeY;

  var snake_color = "#058F03";
  var snake_color2 = "#024001";

  var unevenGrid = false;

  var score = 0;

  var dir = ""; //saves current direction

  var gameoverState = 0;

  var mov = 0;

  var eatSound = new Audio();
  eatSound.src = "audio/bite.wav";

  var deathSound = new Audio();
  deathSound.src = "audio/death.wav";

  var appleImg = new Image();


  //**setup**

  //draw start screen
  c.fillStyle = "#292929";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.font = "50px Arial";
  c.fillStyle = "#ffffff";
  c.fillText("Welcome to Snake", 230, 100);
  c.fillText("Press Arrow keys to move", 150, 150);

  // when player presses any key
  window.addEventListener("keydown", function() {
    if (gamestate == 0) {

      //set size
      switch (sizeSelect.value) {
        case "s":
          box = 30;
          appleImg.src = "img/apple30x30.png";
          break;
        case "m":
          box = 20;
          unevenGrid = true;
          appleImg.src = "img/apple20x20.png";
          break;
        case "b":
          box = 15;
          appleImg.src = "img/apple15x15.png";

          break;
      }

      //set speed
      switch (speedSelect.value) {
        case "n":
          setInterval(draw, 125);
          break;
        case "m":
          setInterval(draw, 100);
          break;
        case "f":
          setInterval(draw, 75);
          break;
      }

      // Create Snake
      snake = [];
      snake[0] = {
        x: 5 * box,
        y: 5 * box
      };

      foodX = foodSetRandomXCord(); // set random food x cord
      foodY = foodSetRandomYCord(); // set random food y cord
      gamestate = 1;
    }
  });

  //**setup end**



  //**draw**
  function draw() {
    //play state
    if (gamestate == 1) {

      //gameover detection
      if (gameoverState == 1) {
        deathSound.play();
        gamestate = 2;
      }
      // reset move count
      mov = 0;


      // draw background
      drawBackground();
      foodDraw(foodX, foodY);

      // draw Snake
      for (var i = 0; i < snake.length; i++) {
        if (i % 2 == 0) { // if i is even
          c.fillStyle = snake_color;
        } else { // if i is not even
          c.fillStyle = snake_color2;
        }
        c.fillRect(snake[i].x, snake[i].y, box, box);
      }

      //old Head Pos
      snakeX = snake[0].x;
      snakeY = snake[0].y;
      // Remove Tail

      //check if snake head is on food
      if (snakeX == foodX && snakeY == foodY) {
        foodX = foodSetRandomXCord(); // set random food x cord
        foodY = foodSetRandomYCord(); // set random food y cord
        score++;
        scoreboard.innerHTML = "Score: " + score;
        eatSound.play();
      } else {
        snake.pop(); // remove tail
      }
      // check if nnew food pos is inside the snake
      for (var i = 0; i < snake.length; i++) {
        if (foodX == snake[i].x && foodY == snake[i].y) {
          var foodInSnake = true;
          while (foodInSnake) {
            foodX = foodSetRandomXCord(); // set random food x cord
            foodY = foodSetRandomYCord(); // set random food y cord
            foodInSnake = false;
          }
        } else {
          foodInSnake = false;
        }
      }

      // Move to New Direction
      if (dir == "LEFT") {
        snakeX = snakeX - box;
      }
      if (dir == "UP") {
        snakeY = snakeY - box;
      }
      if (dir == "RIGHT") {
        snakeX = snakeX + box;
      }
      if (dir == "DOWN") {
        snakeY = snakeY + box;
      }

      //Create new Head in new Position
      newHead = {
        x: snakeX,
        y: snakeY
      }

      //Gameover conditions
      if (newHead.x > canvas.width - 1 || newHead.x < 0 || newHead.y > canvas.height - 1 || newHead.y < 0 || collision(newHead, snake)) {
        gameoverState = 1;
      }

      //add new head to snake
      snake.unshift(newHead);

    } // play state end

    // Gameoverscreen
    if (gamestate == 2) {
      c.fillStyle = "#383838";
      c.fillRect(190, 130, 530, 300);
      c.font = "50px Arial";
      c.fillStyle = "#ffffff";
      c.fillText("looks like you lost", 255, 190);
      c.fillText("Press F5 to play again", 205, 240);
      c.fillText("Your score was: " + score, 250, 380);
    }
    // Gameoverscreen end

  }
  //**draw end**

  // Snake Controlls, Svaes The Current Direction
  window.addEventListener("keydown", function() {
    var key = event.keyCode;
    if (key == 37 && !(dir == "RIGHT") && !(mov == 1)) {
      dir = "LEFT";
      mov = 1;
    }
    if (key == 38 && !(dir == "DOWN") && !(mov == 1)) {
      dir = "UP";
      mov = 1;
    }
    if (key == 39 && !(dir == "LEFT") && !(mov == 1)) {
      dir = "RIGHT";
      mov = 1;
    }
    if (key == 40 && !(dir == "UP") && !(mov == 1)) {
      dir = "DOWN";
      mov = 1;
    }
  });


  //**Functions**


  //creates Gird
  function drawBackground() {
    var x_grid = 0;
    var y_grid = 0;
    var color_i = 0;

    for (var i = 0; i < canvas.height / box; i++) { //draws x line for each y box height
      x_grid = 0;
      for (var i_width = 0; i_width < canvas.width / box; i_width++) { // Draw 1 x line of boxes
        if (color_i % 2 == 0) { //if color_i is even
          c.fillStyle = "#cfcfcf";
        } else { //if color_i is not even
          c.fillStyle = "#adadad";
        }
        c.fillRect(x_grid, y_grid, box, box);
        x_grid = x_grid + box;
        color_i++;
      }
      y_grid = y_grid + box;
      if (unevenGrid == false) {
        color_i++;
      }

    }
  }

  //update food
  function foodDraw(x, y) {
    c.drawImage(appleImg, x, y);
  }

  //sets x position to a random Value on the grid
  function foodSetRandomXCord() {
    var rand_x = parseInt(Math.random() * canvas.height / box) * box;
    return rand_x;
  }

  //sets y position to a random Value on the grid
  function foodSetRandomYCord() {
    var rand_y = parseInt(Math.random() * canvas.height / box) * box;
    return rand_y;
  }

  // collison
  function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
      if (head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
    return false;
  }

});
