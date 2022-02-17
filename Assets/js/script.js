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
var scoreBoardList = document.getElementById("scoreboard");
// var ClearButtonEL = document.getElementById("clearbutton");

//defining variables
var questionNum = 0;
var answerNum = 0;
var timeLeft = 0;
var timeRemaining = 0;
var users = [];
// var userName = "";

//user profile to track stats
var userProfile = {
  userName: null,
  userScore: 50,
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
  "Done",
];

//answers to the questions
var answers = ["2", "3", "2", "1", "3", "2", "2", "1", "3", "1"];

function Inti() {
  var storedScores = JSON.parse(localStorage.getItem(users));

  if (storedScores !== null) {
    users = storedScores;
  }
  renderScoreboard();
}

function handleScoreStore() {
  var userName = window.prompt(
    "Please enter your initals to record your score"
  );

  userScore = timeRemaining;
  users.push(userName);

  storeScores();
  renderScoreboard();
}

function storeScores() {
  localStorage.setItem(users, JSON.stringify(users));
}

function renderScoreboard() {
  scoreBoardList.innerHTML = "";

  quizBoxEL.style.display = "none";
  scoreBoardEL.style.display = "block";

  // Render a new li for each user
  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    var li = document.createElement("li");
    li.textContent = "User: " + user + " Score: " + userScore;
    li.setAttribute("data-index", i);

    var removeButton = document.createElement("button");
    ClearButtonEL.textContent = "Remove";

    li.appendChild(button);
    scoreBoardList.appendChild(li);
  }
}

scoreBoardList.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
  }
});

// ClearButtonEL.addEventListener("click", function (event) {
//   event.preventDefault(event);
//   localStorage.clear();
//   // users = [];
//   // storeScores();
//   renderScoreboard();
// });

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
  questionNum = [];
  answerNum = [];
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

  if ((questionNum = questions.length)) {
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
      answerDisplayEL.textContent = "That was Correct!";
      answerNum++;
      questionNum++;
    } else {
      answerDisplayEL.textContent = "Incorrect, -5 seconds from quiz time";
      timeRemaining -= 5;
    }
  }
}

// button on scoreboard to start quiz
quizStartButtonEL.addEventListener("click", beginQuiz);

// button in "nav" area to show scoreboard
scoreBoardNavEL.addEventListener("click", renderScoreboard);

// intiates function on page load
Inti();
