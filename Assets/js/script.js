//getting element variables set
var timerEL = document.getElementById("timer");
var scoreBoardEL = document.getElementById("scoreblock");
var quizBoxEL = document.getElementById("quizblock");
var questionZone = document.getElementById("questionzone");
var quizStartButtonEL = document.getElementById("startquiz");
var scoreBoardNavEL = document.getElementById("highscores");
var answerButtonsEL = quizBoxEL.children[0];
var answer1ButtonEL = quizBoxEL.children[0].children[0];
var answer2ButtonEL = quizBoxEL.children[0].children[1];
var answer3ButtonEL = quizBoxEL.children[0].children[2];
var answerDisplayEL = document.getElementById("answerDisplay");

//defining variables
var TimeRemaining = 0;
var score = 0;
var userName = "";
var questionNum = 0;

//user profile to track stats
var userProfile = {
  Name: userName,
  userScore: score,
  userTime: TimeRemaining,
};

//questions to be asked
var questions = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10."];

//answers to the questions
var answers = ["2", "3", "2", "1", "3", "2", "2", "1", "3", "1"];

// funtion used by begin quiz button, starts countdown before timer begins, and loads question display function
function beginQuiz() {
  //displays the quiz and hide the scoreboard
  scoreBoardEL.style.display = "none";
  quizBoxEL.style.display = "block";

  score = [];
  alert("Beginning Quiz" + "\n" + "Watch your time...");

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
  questionNum = 0;
  var timeLeft = 50;

  var countDown = setInterval(function () {
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
      questionZone.textContent = questions[questionNum];
      questionNum++;
    }
  }, 500);
}

function handleQuizQuestions() {
  //buttons declare right move to next question and add score, or wrong and adjust time
  var correct = (answerDisplayEL.textContent = "That was Correct! + 25pts");
  var wrong = (answerDisplayEL.textContent =
    "Wrong, the correct answer was " +
    answers[questionNum] +
    " -5 seconds from quiz time");
}

//hides the quiz, resets the quiz if clicked, shows scoreboard
function showScores() {
  quizBoxEL.style.display = "none";

  timeLeft = 0;
  //   handleSaveScore();

  scoreBoardEL.style.display = "block";
}

// button on scoreboard to start quiz
quizStartButtonEL.addEventListener("click", beginQuiz);

// button in "nav" area to show scoreboard
scoreBoardNavEL.addEventListener("click", showScores);

// intiates function on page load
showScores();
