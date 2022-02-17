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
var ClearButtonEL = document.getElementById("clearbutton");

//defining variables
var questionNum = 0;
var answerNum = 0;
var timeLeft = 0;
var users = [];

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

function Inti() {
  var storedScores = JSON.parse(localStorage.getItem("users"));

  if (storedScores !== null) {
    users = storedScores;
  }
  renderScoreboard();
}

function storeScores() {
  localStorage.setItem("users", JSON.stringify(users));
}

function handleScoreStore() {
  var userName = window.prompt(
    "Please enter your initals to record your score"
  );

  users.push(userName);

  storeScores();
  renderScoreboard();
}

function renderScoreboard() {
  scoreBoardList.textContent = "";

  quizBoxEL.style.display = "none";
  scoreBoardEL.style.display = "block";

  // Render a new li for each user
  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    var li = document.createElement("li");
    li.textContent = user;
    li.setAttribute("data-index", i);

    scoreBoardList.appendChild(li);
  }
}

ClearButtonEL.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("ClearButtonEL") === true) {
    var index = element.parentElement.getAttribute("data-index");
    users.splice(index, 1);

    storeScores();
    renderScoreboard();
  }
});

Inti();
