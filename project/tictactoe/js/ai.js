//game object with all informations needed
var compGame = {
  user:'',
  computer:'',
  currentPlayer:'',
  moves:1,
};

  function setFig(id){
    if(id === 'X'){
      game.user = '<span class="fa fa-times"></span>';
      game.computer = '<span class="fa fa-circle-o"></span>';
      }
      else if (id === 'O'){
        game.user = '<span class="fa fa-circle-o"></span>';
        game.computer = '<span class="fa fa-times"></span>';
      }
      firstMove();
      currentPlayer('user');
    }
    //first Move in game for the computer
    function firstMove(){
      $('#4').html(game.computer);
      $('#4').removeAttr('onClick');
    }
    function setCurrentPlayer(curr){
      game.currentPlayer = curr;
    }
    function icon(id){
      if(game.currentPlayer == 'user'){
        $('#' +id).html(game.user);
        $('#' +id).removeAttr('onClick');
        setGameStatus();
        setCurrentPlayer('computer');
      }
      else if(game.currentPlayer == 'computer'){
        $('#' +id).html(game.computer);
        $('#' +id).removeAttr('onClick');
        setGameStatus();
        setCurrentPlayer('user');
      }
      game.moves++;


      if (game.currentPlayer=='computer'){
        comp();
      }
    }
    function comp(){
      switch (true) {
        case $('#0').html() != game.user && $('#0').html() != game.computer: icon('#0');
        break;
        case $('#1').html() != game.user && $('#1').html() != game.computer: icon('1');
        break;
        case $('#2').html() != game.user && $('#2').html() != game.computer: icon('2');
        break;
        case $('#3').html() != game.user && $('#3').html() != game.computer: icon('3');
        break;
        case $('#4').html() != game.user && $('#4').html() != game.computer: icon('4');
        break;
        case $('#5').html() !== game.user && $('#5').html() !== game.computer: icon('5');
        break;
        case $('#6').html() !== game.user && $('#6').html() !== game.computer: icon('6');
        break;
        case $('#7').html() !== game.user && $('#7').html() !== game.computer: icon('7');
        break;
        case $('#8').html() !== game.user && $('#8').html() !== game.computer: icon('8');
        break;
      }
    };
    //Who won the game?
    function gameResult(){
      var curPlayer;

      if (game.currentPlayer == 'user'){
        curPlayer = game.user;
      }
      else if(game.currentPlayer == 'computer'){
        curPlayer = game.computer;
      }

      switch (true) {
        case $('#first').html() === curPlayer && $('#second').html() === curPlayer &&
        $('#third').html() === curPlayer:
          show('#first', '#second', '#third');
          break;
        case $('#fourth').html() === curPlayer && $('#fifth').html() === curPlayer &&
        $('#sixth').html() === curPlayer:
          show('#fourth', '#fifth', '#sixth');
          break;
        case $('#seventh').html() === curPlayer && $('#eight').html() === curPlayer &&
        $('#nineth').html() === curPlayer:
          show('#seventh', '#eight', '#nineth');
          break;
        case $('#first').html() === curPlayer && $('#fourth').html() === curPlayer &&
        $('#seventh').html() === curPlayer:
          show('#first', '#fourth', '#seventh');
          break;
        case $('#second').html() === curPlayer && $('#fifth').html() === curPlayer &&
        $('#eight').html() === curPlayer:
          show('#second', '#fifth', '#eight');
          break;
        case $('#third').html() === curPlayer && $('#sixth').html() === curPlayer &&
        $('#nineth').html() === curPlayer:
          show('#third', '#sixth', '#nineth');
          break;
        case $('#first').html() === curPlayer && $('#fifth').html() === curPlayer &&
        $('#nineth').html() === curPlayer:
          show('#first', '#fifth', '#nineth');
          break;
        case $('#third').html() === curPlayer && $('#fifth').html() === curPlayer &&
        $('#seventh').html() === curPlayer:
          show('#third', '#fifth', '#seventh');
          break;
          default:
          draw();
      }
    };

    function show(x, y, z){
      var x = $(x);
      var y = $(y);
      var z = $(z);
      x.addClass('win');
      y.addClass('win');
      z.addClass('win');
      lockAll();
      setTimeout(reset, 1500);
    }
    function reset(){
      $('.game-field').html('');
      game.moves = 1;
      $('.game-field').attr('onClick', 'icon(this.id)');
      $('.win').removeClass('win');
      setTimeout(firstMove, 200);
    }
