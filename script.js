var timer = document.getElementById("timer");
var startBtn = document.getElementById("start-game");
var intro = document.getElementById("intro");
var questionsEl = document.getElementById("questions");
var index = 0


// Display next Question
function displayNextQuest() {

    var newDiv = document.createElement("h2");
    newDiv.textContent = questions[index].question;
    questionsEl.appendChild(newDiv);
    newDiv.setAttribute("data-state", "hidden");

        
    for(var i = 0; i < questions[index].answers.length; i++) {
            
        var multipleChoiceOptions = document.createElement("button");
        multipleChoiceOptions.textContent = questions[index].answers[i];
        questionsEl.appendChild(multipleChoiceOptions);
        multipleChoiceOptions.setAttribute("data-state", "hidden");

        multipleChoiceOptions.addEventListener("click", clickAnswer);

    }
    
    // questionsEl.textContent = questOne.question;
};

function clickAnswer() {
    console.log(this);


    
    if (this.textContent === [index].correct) {
        
        document.getElementById("right-or-wrong").textContent = "Correct!"
        
    } else {
        
        document.getElementById("right-or-wrong").textContent = "Incorrect!"
        
    }
    index++
    
    displayNextQuest();
};

var subtractTen
var endGame

var time = "Time: ";
var count = 60;
var intervalId;

// Questions to be added to the DOM
var questions = [
{
    question: "Which of the following is not an HTML tag?",
    answers: ["<footer>", "<!DOCTYPE", "<p>", "<paragraph>"],
    correct: "<paragraph>"
}, 
{
    question: "True or False: An HTML document can be linked to more than one stylesheet",
    answers: ["True", "False"],
    correct: "True"
}, 
{
    question: "What is a boolean?",
    answers: ["A collection of alphanumeric characters", "Another term used in Javascript for numbers", "A piece of data with two possible values: true or false.", "A variable with no value assigned to it"],
    correct: "A piece of data with two possible values: true or false."
}, 
{
    question: "What is the correct syntax for an ID selector in CSS?",
    answers: [".Ilovecats", "#iLoveCats", ".iLoveCats", "$iLoveCats"],
    correct: "#iLoveCats"
}, 
{
    question: "True or False: In Javascript, the 'this' keyword always refers to the window object.",
    answers: ["True", "False"],
    correct: "False"
}];


// Add Start Quiz button click functionality
startBtn.addEventListener("click", startGame);

// Start timer, clear it at 0 and end game
function startTimer() {

    var intervalId = setInterval(function () {
        count -= 1;
        timer.textContent = time + count;
        if (count === 0) {
            clearInterval(intervalId);
        }
    }, 1000);

}


// Start timer, hide intro, and display next question
function startGame() {
    
    startTimer();
    
    // Hide intro
    intro.setAttribute("style", "display: none;")

    displayNextQuest();

};



