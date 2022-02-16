//getting element variables set
var timerEL = document.getElementById("timer");
var scoreBoardEL = document.getElementById("scoreblock");
var quizBoxEL = document.getElementById("quizblock");
var quizStartButtonEL = document.getElementById("startquiz");
var scoreBoardNavEL = document.getElementById("highscores");

//defining variables
var TimeRemaining = 0;
var score = 0;
var userName = "";

//user profile to track stats
var userProfile = {
  Name: userName,
  userScore: score,
  userTime: TimeRemaining,
};

//questions to be asked
var questions = [];

// funtion used by begin quiz button, starts countdown before timer begins, and loads question display function
function beginQuiz() {
  //displays the quiz and hide the scoreboard
  scoreBoardEL.style.display = "none";
  quizBoxEL.style.display = "block";
  TimeRemaining = 1;
  score = [];
  window.alert("Beginning Quiz" + "\n" + "Watch your time...");

  var timeLeft = 4;
  var countDown = setInterval(function () {
    // displayMessage();
    timeLeft--;
    timerEL.textContent = "Get ready, " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(countDown);
      displayMessage();
      timerEl.textContent = null;
    }
  }, 1000);

  //start timer
  //display question -contains buttons
}

// Button to hide scoreboard, initiate test, and start timer

// intiate page load
function showScores() {
  //hide quiz
  quizBoxEL.style.display = "none";
  //stop quiz

  //show scoreboard -- user best
  scoreBoardEL.style.display = "block";
}

quizStartButtonEL.addEventListener("click", beginQuiz);

scoreBoardNavEL.addEventListener("click", showScores);

showScores();
