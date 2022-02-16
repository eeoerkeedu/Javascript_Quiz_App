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
var questions = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10."];
var answers = ["B", "C", "B", "A", "C", "B", "B", "A", "C", "A"];

// funtion used by begin quiz button, starts countdown before timer begins, and loads question display function
function beginQuiz() {
  //displays the quiz and hide the scoreboard
  scoreBoardEL.style.display = "none";
  quizBoxEL.style.display = "block";
  score = [];
  window.alert("Beginning Quiz" + "\n" + "Watch your time...");

  var timeLeft = 4;
  var countDown = setInterval(function () {
    // displayMessage();
    timeLeft--;
    timerEL.textContent = "Get ready, " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(countDown);

      displayQuestion();
    }
  }, 1000);
}

function displayQuestion() {
  var questionNum = 0;
  var timeLeft = 50;

  var countDown = setInterval(function () {
    // displayMessage();
    timeLeft--;
    timerEL.textContent = timeLeft + " Seconds Remaining";

    if (timeLeft === 0) {
      clearInterval(countDown);
    }
  }, 100);

  var questionInterval = setInterval(function () {
    if (questions[questionNum] === undefined) {
      clearInterval(questionInterval);
    } else {
      quizBoxEL.textContent = questions[questionNum];
      questionNum++;
    }
  }, 500);
}

function handleQuizQuestions() {
  //display 3 buttons everytime the questionNum changes
  //buttons declare right or wrong and adjust time if needed
  //
}

//hides the quiz, resets the quiz if clicked, shows scoreboard
function showScores() {
  //hide quiz
  quizBoxEL.style.display = "none";
  //stop quiz

  //show scoreboard -- user best
  scoreBoardEL.style.display = "block";
}

// button on scoreboard to start quiz
quizStartButtonEL.addEventListener("click", beginQuiz);

// button in "nav" area to show scoreboard
scoreBoardNavEL.addEventListener("click", showScores);

// intiates function on page load
showScores();
