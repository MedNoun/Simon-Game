var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var randomNumber;
var userClickedPattern= new Array();
var started = false;
var level = 0;
var currentLevel=0;
function playSound(sound){
  let audio = new Audio("sounds/"+sound+".mp3");
  audio.play();
}
function animatePress(color){
    $(".btn."+color).addClass("pressed");
    setTimeout(function(){
        $(".btn."+color).removeClass("pressed");
    },100);
}
function nextSequence() {
    userClickedPattern=[];
    currentLevel = 0;
    level=level+1;
    $("h1").text("level "+level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $(".btn."+randomChosenColour).fadeOut(70).fadeIn(70);

}
$(document).on('keypress',function(){
    if(!started){
        level=0;
        started=true;
        gamePattern=[];
        nextSequence();
    }

})
function wrongClick(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}
function checkAnswer(){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success  "+currentLevel);
        currentLevel+=1;
    }else{
        currentLevel=0;
        wrongClick();
        console.log("failure ! ");
        started=false;
        $("h1").text("Game Over ! Press any key to restart ");
    }
}
$(".btn").on("click",function(e){
    if(started){
        var userChosenColour = e.target.id;
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        console.log(gamePattern);
        checkAnswer();
        playSound(userChosenColour);
        if(currentLevel===level){
            setTimeout(function(){
                nextSequence();
            },1000);

        }
    }else{
        wrongClick();

    }

})