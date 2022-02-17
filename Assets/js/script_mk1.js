//getting element variables set
var timerEL = document.getElementById("timer");
var scoreBoardEL = document.getElementById("scoreblock");
var quizBoxEL = document.getElementById("quizblock");
var questionZone = document.getElementById("questionzone");
var quizStartButtonEL = document.getElementById("startquiz");
var scoreBoardNavEL = document.getElementById("highscores");
var answerButtonsEL = quizBoxEL.children[0];
var answer1ButtonEL = document.getElementById("button1");
var answer2ButtonEL = document.getElementById("button2");
var answer3ButtonEL = document.getElementById("button3");
var answerDisplayEL = document.getElementById("answerDisplay");

//defining variables
// var TimeRemaining = 0;
// var score = 0;
// var userName = "";
var questionNum = 0;
var answerNum = 0;
var timeLeft = 0;

//user profile to track stats
var userProfile = {
  userName: "",
  userScore: 0,
  userTime: 0,
};

//questions to be asked
var questions = [
  "1. press 2",
  "2. press 3",
  "3. press 2",
  "4. press 1",
  "5. press 3",
  "6. press 2",
  "7. press 2",
  "8. press 1",
  "9. press 3",
  "10. press 1",
];

//answers to the questions
var answers = ["2", "3", "2", "1", "3", "2", "2", "1", "3", "1"];

// funtion used by begin quiz button, starts countdown before timer begins, and loads question display function
function beginQuiz() {
  //displays the quiz and hide the scoreboard
  scoreBoardEL.style.display = "none";
  quizBoxEL.style.display = "block";

  userScore = [];
  userName = [];
  userTime = [];

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
  answerNum = 0;
  timeRemaining = 50;

  var countDown = setInterval(function () {
    timeRemaining--;
    timerEL.textContent = timeRemaining + " Seconds Remaining";
    questionZone.textContent = questions[questionNum];
    console.log("question num: " + questionNum);
    if (timeRemaining === 0 || timeRemaining < 0) {
      clearInterval(countDown);
      handleScoreStore();
    }
  }, 1000);

  handleQuizAnswers();

  if (questionNum > 9) {
    handleScoreStore();
  }
}

function handleQuizAnswers() {
  var userAnswer = 0;

  answer1ButtonEL.addEventListener("click", function () {
    userAnswer = 1;
    console.log(userAnswer);
    console.log(answers[answerNum]);
    console.log(userAnswer == answers[answerNum]);
    checkTruth();
  });
  answer2ButtonEL.addEventListener("click", function () {
    userAnswer = 2;
    console.log(userAnswer);
    console.log(answers[answerNum]);
    console.log(userAnswer == answers[answerNum]);
    checkTruth();
  });
  answer3ButtonEL.addEventListener("click", function () {
    userAnswer = 3;
    console.log(userAnswer);
    console.log(answers[answerNum]);
    console.log(userAnswer == answers[answerNum]);
    checkTruth();
  });

  function checkTruth() {
    if (userAnswer == answers[answerNum]) {
      answerDisplayEL.textContent = "That was Correct! +25pts";
      userScore + 25;
      answerNum++;
      questionNum++;
    } else {
      answerDisplayEL.textContent = "Wrong, -5 seconds from quiz time";
      timeLeft -= 5;
    }
  }
}

function handleScoreStore() {
  userName = prompt("Please Enter Your Initials");
  userTime = timeRemaining;
  localStorage.setItem(userName, JSON.stringify(userProfile));
  if (userName !== null) {
    genScoreBoard();
    showScores();
  } else {
    showScores();
  }
}

function genScoreBoard() {
  var scoreBoardList = document.getElementById("scoreboard");
  var scoreLine = JSON.parse(localStorage.getItem("userName"));
  if (scoreLine !== null) {
    var li = document.createElement("li");
    li.textContent =
      scoreLine.userName +
      "        " +
      scoreLine.userScore +
      "        " +
      scoreLine.userTime;
    scoreBoardList.appendChild(li);
  }
}

function clearScores() {}

//hides the quiz, resets the quiz if clicked, shows scoreboard
function showScores() {
  quizBoxEL.style.display = "none";
  questionNum = [];
  answerNum = [];
  var scoreLine;
  scoreBoardEL.style.display = "block";
}

// button on scoreboard to start quiz
quizStartButtonEL.addEventListener("click", beginQuiz);

// button in "nav" area to show scoreboard
scoreBoardNavEL.addEventListener("click", showScores);

// intiates function on page load
showScores();
