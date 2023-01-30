var isStart = 0;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["green", "red", "yellow", "blue"];

// keypress handler for start the game
$("*").on("keydown",function (){
  if (!isStart) {
    $("#level-title").text("level "+ "0");
    isStart = 1;
    nextSequence();
  }
});

// click handler
$(".btn").on("click",function (){
  userClickedPattern.push(this.id);
  soundHandler(this.id);
  buttonPressAnimation(this.id);
  checkAnswer(userClickedPattern.length-1);
});

// function to reset everything
function startOver(){
  isStart = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
// function to next level
function nextSequence() {
  // get a random number from 0, 1, 2 or 3.
  $("#level-title").text("level "+ level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  soundHandler(randomChosenColour);
  $("#" + randomChosenColour).animate({opacity: 0});
  $("#" + randomChosenColour).animate({opacity: 1});
}

function checkAnswer(currIndex){
  //compare
  if (gamePattern[currIndex] != userClickedPattern[currIndex]){
    soundHandler("wrong")
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    return;
  }
  if(currIndex == gamePattern.length -1){
    setTimeout(nextSequence,1000);
    userClickedPattern = [];
  }
  return;
}

// press animate
function buttonPressAnimation(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){$("#"+color).removeClass("pressed");}, 100);
}

function soundHandler(color) {
  switch (color) {
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "wrong":
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      break;
    default:
      console.log(color);
  }
}
