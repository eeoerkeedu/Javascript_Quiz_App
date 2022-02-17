//getting element variables set
var timerEL = document.getElementById("timer");
var scoreBoardEL = document.getElementById("scoreblock");
var quizBoxEL = document.getElementById("quizblock");
var questionZone = document.getElementById("questionzone");
var quizStartButtonEL = document.getElementById("startquiz");
var answerButtonsEL = quizBoxEL.children[0];
var answer1ButtonEL = document.getElementById("button1");
var answer2ButtonEL = document.getElementById("button2");
var answer3ButtonEL = document.getElementById("button3");
var answerDisplayEL = document.getElementById("answerDisplay");
var scoreBoardList = document.getElementById("scoreboard");
var clearButtonEL = document.getElementById("clearbutton");

//defining variables
var questionNum = 0;
var answerNum = 0;
var timeLeft = 0;
var timeRemaining = 0;
var users = [];

//questions to be asked
var questions = [
  "1. Inside which HTML element do we put the JavaScript?",
  "2. How do you write 'Hello World' in an alert box?",
  "3. The external JavaScript file must contain the <script> tag?",
  "4. How do you create a function in JavaScript?",
  "5. How to write an IF statement in JavaScript?",
  "Done",
];

// button options to be displayed
var button1Options = [
  "1. <js>",
  "1. msgBox('Hello World')",
  "1. True",
  "1.function myFunction()",
  "1. if i==5 then",
];

var button2Options = [
  "2. <script>",
  "2. alertBox('Hello World')",
  "2. False",
  "2. function:myFunction()",
  "2. if i=5 then",
];

var button3Options = [
  "3. <scripting>",
  "3. alert('Hello World')",
  "3. N/A",
  "3. function = myFunction()",
  "3. if (i==5)",
];

//answers to the questions
var answers = ["2", "3", "2", "1", "3"];

// initial page load function, dispalys scores in memory via renderScoreboard if any
function Inti() {
  var storedScores = JSON.parse(localStorage.getItem("users"));

  if (storedScores !== null) {
    users = storedScores;
  }
  renderScoreboard();
}

// adds user and score to array and local memory, then calls renderScoreboard
function handleScoreStore() {
  var userName = window.prompt(
    "Please enter your initals to record your score"
  );
  var userScore = timeRemaining;

  users.push([userName + "--------Score: " + userScore]);

  localStorage.setItem("users", JSON.stringify(users));
  renderScoreboard();
  location.reload();
}

// returns to view of scoreboard, itterates the local memory for users and scores and displays on their own lines
function renderScoreboard() {
  quizBoxEL.style.display = "none";
  scoreBoardEL.style.display = "block";

  // Render a new li for each user
  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    var li = document.createElement("li");
    li.textContent = "User: " + user;
    scoreBoardList.appendChild(li);
  }
}

// clears the scoreboard of scores
clearButtonEL.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    localStorage.clear();
    users = [];
    location.reload();
  }
});

// funtion used by begin quiz button, starts countdown before timer begins, and loads questionDisplay function
function beginQuiz() {
  answer1ButtonEL.textContent = "# 1.";
  answer2ButtonEL.textContent = "# 2.";
  answer3ButtonEL.textContent = "# 3.";
  scoreBoardEL.style.display = "none";
  timerEL.textContent = "";
  timerEL.style.display = "inline";
  questionZone.textContent = "";
  quizBoxEL.style.display = "block";
  questionNum = 0;
  answerNum = 0;
  userScore = 0;
  userName = 0;

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

// main quiz funtion, displays questions, set timer, checks timer for end condition
function displayQuestion() {
  questionNum = 0;
  answerNum = 0;
  timeRemaining = 30;

  // counts down the timer on the quiz
  var countDown = setInterval(function () {
    timeRemaining--;
    timerEL.textContent = timeRemaining + " Seconds Remaining";
    answer1ButtonEL.textContent = button1Options[answerNum];
    answer2ButtonEL.textContent = button2Options[answerNum];
    answer3ButtonEL.textContent = button3Options[answerNum];
    questionZone.textContent = questions[questionNum];
    // If time is up send to end condition
    if (timeRemaining === 0 || timeRemaining < 0) {
      clearInterval(countDown);
      alert("Time's Up!");
      handleScoreStore();
    }
  }, 1000);

  // stops timer and logs player info once all q's have been answered
  function checkEnd() {
    if (questionNum == 5) {
      handleScoreStore();
      clearInterval(countDown);
    }
  }
  handleQuizAnswers();

  // adds event listeners to the answer buttons and runs check for each click
  function handleQuizAnswers() {
    var userAnswer = 0;

    answer1ButtonEL.addEventListener("click", function () {
      userAnswer = 1;
      checkTruth();
    });
    answer2ButtonEL.addEventListener("click", function () {
      userAnswer = 2;
      checkTruth();
    });
    answer3ButtonEL.addEventListener("click", function () {
      userAnswer = 3;
      checkTruth();
    });

    // determines if the player answer matches the correct answer, and moves along if correct, or punishes if inccorrect
    function checkTruth() {
      if (userAnswer == answers[answerNum]) {
        answerDisplayEL.textContent = "That was Correct!";
        answerNum++;
        questionNum++;
        checkEnd();
      } else {
        answerDisplayEL.textContent = "Incorrect, -5 seconds from quiz time";
        timeRemaining = timeRemaining - 5;
      }
    }
  }
}

// button on scoreboard to start quiz
quizStartButtonEL.addEventListener("click", beginQuiz);

// intiates function on page load
Inti();
