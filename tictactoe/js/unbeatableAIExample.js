
var board;
const humanPlayer = 'X';
const ai = 'O';
const winCombos =
[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const fields = document.querySelectorAll('.field');
startGame();

function startGame()
{
  document.querySelector(".endscreen").style.display = "none";
  board = Array.from(Array(9).keys());
  for (var i = 0; i < fields.length; i++)
  {
    fields[i].innerText = '';
    fields[i].style.removeProperty('background-color');
    fields[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(square)
{
  if (typeof board[square.target.id] == 'number')
  {
    turn(square.target.id, humanPlayer)
    if (!checkWin(board, humanPlayer) && !tie()) turn(bestSpot(), ai);
  }
}

function turn(squareId, player)
{
  board[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(board, player)
  if (gameWon) gameOver(gameWon)
}

function checkWin(board, player)
{
  let plays = board.reduce((a, e, i) =>
  (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries())
  {
    if (win.every(elem => plays.indexOf(elem) > -1))
    {
      gameWon = {index: index, player: player};
      break;
    }
  }
return gameWon;
}

function gameOver(gameWon)
{
  for (let index of winCombos[gameWon.index])
  {
    document.getElementById(index).style.backgroundColor =
    gameWon.player == humanPlayer ? "green" : "#9c0202";
  }
  for (var i = 0; i < fields.length; i++)
  {
    fields[i].removeEventListener('click', turnClick, false);
  }
  winner(gameWon.player == humanPlayer ? "Gewonnen" : "Verloren");
}

function winner(who)
{
  document.querySelector(".endscreen").style.display = "block";
  document.querySelector(".endscreen .text").innerText = who;
}

function emptySquares()
{
  return board.filter(s => typeof s == 'number');
}

function bestSpot()
{
  return minimaxAlgo(board, ai).index;
}

function tie()
{
  if (emptySquares().length == 0)
  {
    for (var i = 0; i < fields.length; i++)
    {
      fields[i].style.backgroundColor = "#ffd230";
      fields[i].removeEventListener('click', turnClick, false);
    }
  winner("Unentschieden")
  return true;
  }
  return false;
}

function minimaxAlgo(newBoard, player)
{
  var availSpots = emptySquares();
  if (checkWin(newBoard, humanPlayer))
  {
    return {score: -10};
  }
  else if (checkWin(newBoard, ai))
  {
    return {score: 10};
  }
  else if (availSpots.length === 0)
  {
    return {score: 0};
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++)
  {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == ai)
    {
      var result = minimaxAlgo(newBoard, humanPlayer);
      move.score = result.score;
    }
    else
    {
      var result = minimaxAlgo(newBoard, ai);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if(player === ai)
  {
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++)
    {
      if (moves[i].score > bestScore)
      {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  else
  {
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++)
    {
      if (moves[i].score < bestScore)
      {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
