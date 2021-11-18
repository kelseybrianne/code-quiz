var timer = document.getElementById("timer");
var startBtn = document.getElementById("start-game");
var intro = document.getElementById("intro");
var mainCont = document.getElementById("questions");
var newQuestion = document.createElement("div");
var questionEl = document.createElement("h2");
var answerEl = document.createElement("p");

var validateAnswer
var subtractTen
var endGame

var time = "Time: ";
var count = 60;

// Questions to be added to the DOM
var questOne = {
    question: "Which of the following is not an HTML tag?",
    answers: ["<footer>", "<!DOCTYPE", "<p>", "<paragraph>"],
    correct: "<paragraph>"
}
var questTwo = {
    question: "True or False: An HTML document can be linked to more than one stylesheet",
    answers: ["True", "False"],
    correct: "True"
}
var questThree = {
    question: "What is a boolean?",
    answers: ["A collection of alphanumeric characters", "Another term used in Javascript for numbers", "A piece of data with two possible values: true or false.", "A variable with no value assigned to it"],
    correct: "A piece of data with two possible values: true or false."
}
var questFour = {
    question: "What is the correct syntax for an ID selector in CSS?",
    answers: [".Ilovecats", "#iLoveCats", ".iLoveCats", "$iLoveCats"],
    correct: "#iLoveCats"
}
var questFive = {
    question: "True or False: In Javascript, the 'this' keyword always refers to the window object.",
    answers: ["True", "False"],
    correct: "False"
}

// Add Start Quiz button click functionality
startBtn.addEventListener("click", startGame);

// Start timer, clear it at 0 and end game
function startTimer() {

    setInterval(function () {
        count -= 1;
        timer.textContent = time + count;
        if (count === 0) {
            clearInterval(startTimer);
        }
    }, 1000);

}

// Display next Question
function displayNextQuest() {



};

// Start timer, hide intro, and display next question
function startGame() {
    
    startTimer();
    
    // Hide intro
    intro.setAttribute("style", "display: none;")

    displayNextQuest();

    newQuestion.classList.add("q-style");
    mainCont.appendChild(newQuestion);
    newQuestion.appendChild(questionEl);
    questionEl.setAttribute("style", "background-color: blue;")

};



