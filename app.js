const express = require("express");

const app = express();

//Initializing variables
var players = [];
var choices = ["rock","paper","scissors"];
var playerSize = 3;
var winCounter = [];
var winMatrix = [];
var toSend = [];

//Populating the player's choices randomly
function playerChoice() {
  players = [];
  var no = 1;
  for (var i = 0; i <= playerSize ; i++) {
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChoice = choices[randomNumber];
    players.push(randomChoice);
  }
}

//Creating array based on wins
function playGame(){
  playerChoice();
  winCounter = [];
  for(var i =0;i<= playerSize;i++){
    var x = players[i];
    for (var j = 0; j <= playerSize; j++) {
      var y = players[j];
      var z = 0;
      if (x == "rock") {
          if (y == x) {
            z = 0;
          }
          else if (y == "paper") {
            z = 0;
          }
          else {
            z = 1;
          }
      }

      else if (x == "paper") {
        if (y == x) {
          z = 0;
        }
        else if (y == "scissors") {
          z = 0;
        }
        else {
          z = 1;
        }
      }

      else {
        if (y == x) {
          z = 0;
        }
        else if (y == "rock") {
          z = 0;
        }
        else {
          z = 1;
        }
      }
      winCounter.push(z);
    } // end of j loop
  } //end of i loop
}


//Slicing winCounter to create a matrix according to wins of each player
function setMatrix(){
  playGame();
  winMatrix = [];
  winMatrix = [winCounter.slice(0,4), winCounter.slice(4,8), winCounter.slice(8,12), winCounter.slice(12,16)];
}


//GET method
app.get("/game/start", function(req, res) {
   for (var i = 0; i < 50; i++) {
     setMatrix();
     toSend.push({
       "Player Choices": players,
       "Table": winMatrix
     });
   }
   res.json(toSend);
});

app.listen(3000, function(req,res) {
  console.log("server is running");
});
