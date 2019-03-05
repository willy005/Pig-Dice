function Names(name1, name2) {
  this.name1 = name1;
  this.name2 = name2;
}

var pigGame = {
  player1Score: 0,
  player2Score: 0,
  playerUp: 1,
  turnScore: 0,
};

function dieRoll () {
  die1 = Math.floor(Math.random()*6) +1;
  return die1;
}

var playerRoll = function() {
  var roll = dieRoll();
  if(roll ===1){
    pigGame.turnScore = 0;
    alertEndTurn();
    switchPlayer();
  } else {
    pigGame.turnScore +=roll;
    if (pigGame.playerUp === 1) {
      if (pigGame.turnScore + pigGame.player1Score >= 21) {
        alertWinner(1);
      }
    } else if (pigGame.turnScore + pigGame.player2Score >= 21) {
      alertWinner(2);
  }
  }
  return roll;
}

function holdThePig() {
  var currentPlayer = pigGame.playerUp;
  if (currentPlayer ===1) {
    pigGame.player1Score += pigGame.turnScore;
  } else {
    pigGame.player2Score += pigGame.turnScore;
  }
  pigGame.turnScore = 0;
  switchPlayer();
}


function switchPlayer () {
  if (pigGame.playerUp === 1) {
    $("#player1Button").hide();
    $("#player2Button").show();
    pigGame.playerUp = 2;

  } else {
    $("#player2Button").hide();
    $("#player1Button").show();
    pigGame.playerUp = 1;

  }
}

function resetGame() {
  pigGame.player1Score = 0;
  pigGame.player2Score = 0;
  pigGame.playerUp = 1;
  pigGame.turnScore = 0;
}




function alertEndTurn(){
  alert("Sorry you rolled a 1. Your score remains the same and your turn is over.");
  $(".playerStatus").text(pigGame.playerUp);
}

function alertWinner(playerNumber) {
  alert("Player " + playerNumber + " is the BIG winner!!");
  resetGame();
  $(".gameStatusDisplay").text(0);
}

$(document).ready(function() {

  $("form#pigForm").submit(function(event){
    var playerName1 = $("input#playerName1").val();
    var playerName2 = $("input#playerName2").val();
      $("span#playerName1").text(playerName1);
      $("span#playerName2").text(playerName2);
      $("#player2Button").hide();
      $("#player1Button").show();
      $(".playerStatus").text(pigGame.playerUp);
      event.preventDefault();

    var nameHolder = new Names(playerName1, playerName2);
  })


  $(".rollPig").click(function() {
    pigResult = playerRoll();
    $(".rollResult").text(pigResult);
    $(".turnScore").text(pigGame.turnScore);

  });

  $(".holdPig").click(function(){
    holdThePig();
    $("rollResult").text("");
    $(".player1Score").text(pigGame.player1Score);
    $(".player2Score").text(pigGame.player2Score);
    $(".playerStatus").text(pigGame.playerUp);
  });
});
