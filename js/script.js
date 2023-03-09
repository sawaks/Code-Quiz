var startPage = document.querySelector("#start-page");
var startBtn = document.querySelector("#start-btn");
var toScorePage = document.querySelector("#to-score-page");
var timer = document.getElementsByClassName("timer");

var quizPage = document.querySelector("#quiz-page");
var textQuestion = document.querySelector("#text-question");
var listAnswer = document.querySelector("#list-answer");

var inputPage = document.querySelector("#input-page");
var resultPoints = document.querySelector("#result-points");
var initials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit-btn");

var inputInitials = localStorage.getItem("initials");

var scorePage = document.querySelector("#score-page");
var scoreList = document.querySelector("#score-list");
var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn");

var time = document.querySelector("#time");
var secondsLeft = 60;
var timer;
var timerCount;

var resultReaction = document.querySelector("#result-reaction");

let state = {
  userAnswer: "",
  gameCount: 0,
  point: 0
}

function init() {
  state.gameCount = 0;
  state.point = 0;
  changePage(inputPage, startPage);
  clearInterval(timer);
  startBtn.addEventListener("click", gameStart);
  initials.value = "";
  toScorePage.classList.remove("is-hidden");

}

var question = [{
  quizText: "JSON is an abbreviation about JavaScript. What does it stand 'O' in JSON?",
  choice: ["Object", "Occasion", "Only", "Octopus"],
  collect: "Object"
},
{
  quizText: "When CSS needs to use your coding, which place is the best position in a HTML file as you can put the CSS link?",
  choice: ["Inside body tag", "Inside head tag", "Inside footer tag", "Doesn't matter"],
  collect: "Inside head tag"
},
{
  quizText: "When you create and clone a remote repository, which terminal command you will use?",
  choice: ["git pull", "mkdir", "git clone", "git push"],
  collect: "git clone"
},
{
  quizText: "What is the main reason for implementing media queries and flexbox?",
  choice: ["For standard of web development ", "For a developer's motivation", "For a beautiful web design", "For a responsive web design"],
  collect: "For a responsive web design"
},
{
  quizText: "Choose the one has same affect as 'element.textContent'?",
  choice: ["element.innerHTML", "element.attributes", "element.classList", "element.children"],
  collect: "element.innerHTML"
}]


function changePage(hiddenPage, visiblePage) {
  hiddenPage.classList.add("is-hidden");
  hiddenPage.classList.remove("is-visible");
  visiblePage.classList.add("is-visible");
}

function removeReaction(hiddenReaction) {
  hiddenReaction.classList.add("is-hidden");
  hiddenReaction.classList.remove("is-visible");
}

function addReaction(visibleReaction) {
  visibleReaction.classList.add("is-visible");
}

function showQuestion() {
  var str = "";
  question[state.gameCount].choice.forEach(function (value) {
    str += '<li class="questionChoice">' + value + "</li>";
  });
  textQuestion.textContent = question[state.gameCount].quizText;
  listAnswer.innerHTML = str;
}

function choiceQuestion() {
  let questionChoice = document.querySelectorAll(".questionChoice");
  questionChoice.forEach(function (choice) {
    choice.addEventListener(
      "click",
      function () {
        state.userAnswer = this.textContent;
        checkAnswer(question[state.gameCount].collect);
      }
    );
  });
}

function checkAnswer(collect) {
  if (collect === state.userAnswer) {
    correctAnswer();
    resultReaction.textContent = "Previous answer is COLLECT!";
  } else {
    incorrectAnswer();
    resultReaction.textContent = "Previous answer is WRONG!";
  }
  state.gameCount++;
  if (state.gameCount < question.length) {
    showQuestion();
    choiceQuestion();
  } else {
    gameEnd();
  }
}


function correctAnswer() {
  state.point++;
  console.log("COLLECT!!!");
}

function incorrectAnswer() {
  console.log("WRONG!!!");

}

function gameStart() {
  console.log("start");
  changePage(startPage, quizPage);
  showQuestion();
  choiceQuestion();
  startTimer();
  resultReaction.textContent = "";
}

function gameEnd() {
  changePage(quizPage, inputPage);
  resultPoints.textContent = state.point;
  localStorage.setItem("points", state.point);
  clearInterval(timer);
  secondsLeft = 60;
  time.textContent = "END";
  initials.focus();
}

function startTimer() {
  timer = setInterval(function () {
    secondsLeft--;
    time.textContent = secondsLeft;
    if (secondsLeft === 0) {
      secondsLeft = 60;
      clearInterval(timer);
      gameEnd();
    }
  }, 1000);
}

function inputAction() {
  changePage(inputPage, scorePage);
  var inputInitials = initials.value;
  localStorage.setItem("initials", inputInitials);
  showScoreList();
  toScorePage.classList.add("is-hidden");
}

function showScoreList() {
  var setInitials = localStorage.getItem("initials", inputInitials);
  var setScores = localStorage.getItem("points", state.point);
  var scoreInfoArr = [];
  var scoreSingleInfo = { userInitials: setInitials, userScores: setScores };
  var getScores = JSON.parse(localStorage.getItem("scoreInfoArr"));
  var li = document.createElement('li');
  var btnRemove = document.createElement('button');

  scoreInfoArr.push(scoreSingleInfo);
  localStorage.setItem("scoreInfoArr", JSON.stringify(scoreInfoArr));

  li.classList.add("single-info");
  li.innerHTML = `User initials: ${scoreSingleInfo.userInitials} &nbsp;&nbsp; Scores: ${scoreSingleInfo.userScores}&nbsp;&nbsp;`;

  btnRemove.classList.add("btn-remove");
  btnRemove.textContent = "X";
  li.appendChild(btnRemove);

  for (var i = 0; i < getScores.length; i++) {
    scoreList.appendChild(li);
  }

  btnRemove.addEventListener("click", function (event) {
    event.target;
    li.remove();
  })
}

submitBtn.addEventListener("click", inputAction);

toScorePage.addEventListener("click", function () {
  changePage(startPage, scorePage);
  changePage(quizPage, scorePage);
  toScorePage.classList.add("is-hidden");
  clearInterval(timer);
  time.textContent = "60";

})

backBtn.addEventListener("click", function () {
  changePage(scorePage, startPage);
  time.textContent = "60";
  init();
});

clearBtn.addEventListener("click", function () {
  var singleInfos = document.querySelectorAll(".single-info");
  singleInfos.forEach(function (singleInfo) {
    singleInfo.remove();
    localStorage.clear();
  })
})

init();


