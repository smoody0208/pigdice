//Business Logic -----

// Backend logic for Game
function Player (player1, player2){
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer = "player1";
}

function Game () {
  this.turnScore = 0;
  this.totalScore = 0;
  this.gameWins = 0;
}

Game.prototype.winner = function() {
  if (this.totalScore + this.turnScore >= 25) {
    (this.gameWins += 1) && (this.turnScore = 0) && (this.totalScore = 0);
    SwitchUser();
    confirm("Play again?");
  }
  return this.gameWins;
}

// Switch player turn function (needs work)
function SwitchUser () {
  this.turnScore = 0; // clear turn points when players switch
  if (this.currentPlayer === "player2") { // checks to see if current player is at index 0 (player1)
    this.currentPlayer = "player1"; // makes player2 current player
    $(".card-body1").fadeIn();
    $(".card-body2").fadeOut();
    } else {
      this.currentPlayer = "player2"; // makes player 1 current player
      $(".card-body2").fadeIn();
      $(".card-body1").fadeOut();
  }
}

// Roll button method, outputs a random number
Game.prototype.roll = function() {
  let dice = document.getElementsByClassName("dice");
  let diceStatus = document.getElementById("dice-status");
  let newRoll = Math.floor((Math.random() * 6) + 1);
  dice.innerHTML = newRoll;
  diceStatus.innerHTML = newRoll;
  if (newRoll != 1) {
    this.turnScore += newRoll; // pushes new roll into turnScore
    if (this.totalScore + this.turnScore >= 25) {
      alert("You won!");
      this.totalScore = 0
      this.winner;
    }
  } else { // If user rolls one you will get this alert
    alert("You rolled a 1! Your score for this round is 0, and your turn is over!");
    this.turnScore = 0;
    SwitchUser();
  }
  return this.totalScore;
}

Game.prototype.hold = function() {
  SwitchUser(); // changes players
  this.totalScore += this.turnScore; // add turnScore to players totalScore
  this.turnScore = 0;
}

//UI Logic
$(document).ready(function(){
  $("form#player-names").submit(function(event){
    event.preventDefault();
    let namePlayer1 = $("input#player-1-name").val();
    let namePlayer2 = $("input#player-2-name").val();
    $("#p1name").text(namePlayer1);
    $("#p2name").text(namePlayer2);
    $("#pig-dice").fadeIn();
    $("#player-names").fadeOut();
  })
  let playerOne = new Game("player1");
  let playerTwo = new Game("player2");
  $("#roll-player-one").click(function() {
    playerOne.roll();
    playerOne.winner();
    $(".p1-score").text(" " + playerOne.turnScore);
    $(".p1-win").text(" " + playerOne.gameWins);
  })
  $("#hold-player-one").click(function() {
    playerOne.hold();
    $(".p1-total").text(" " + playerOne.totalScore);
  })
  $("#roll-player-two").click(function() {
    playerTwo.roll();
    playerTwo.winner();
    $(".p2-score").text(" " + playerTwo.turnScore);
    $(".p2-win").text(" " + playerTwo.gameWins);
  })
  $("#hold-player-two").click(function() {
    playerTwo.hold();
    $(".p2-total").text(" " + playerTwo.totalScore);
  })
});    