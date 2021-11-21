var timer = document.getElementById("timer");
var startBtn = document.getElementById("start-game");
var intro = document.getElementById("intro");
var questionsEl = document.getElementById("questions");
var initialsEl = document.getElementById("enter-initials");
var highscores = document.getElementById("highscores");
var rightOrWrong = document.getElementById("right-or-wrong")
var index = 0;
var newDiv;
var multipleChoiceOptions;
var allQuestions;
var intervalId;
var newButton;
var highscoreEl;

var time = "Time: ";
var count = 60;
var answeredCorrectly = 0;
var intervalId;



function endGame() {
    // make this page an empty string when first opened to clear the last page
    questionsEl.textContent = "";
    clearInterval(intervalId);

    var score = count + answeredCorrectly;
    
    newDiv = document.createElement("h2");
    newDiv.textContent = "All done!"  
    initialsEl.appendChild(newDiv);
    newPara = document.createElement("p");
    newPara.textContent = `Your final score is ${score}`
    console.log(count);
    initialsEl.appendChild(newPara);
    var enterInitials = document.createElement("p");
    enterInitials.setAttribute("class", "inline");
    enterInitials.textContent = "Enter your initials: "
    initialsEl.appendChild(enterInitials);
    var newInput = document.createElement("input");
    initialsEl.appendChild(newInput);
    newButton = document.createElement("button");
    newButton.textContent = "Submit";
    initialsEl.appendChild(newButton);

    newButton.addEventListener("click", renderHighscores);
    return;
}

function renderHighscores () {
    initialsEl.setAttribute("style", "display: none;");
    highscoreEl = document.createElement("h2");
    highscoreEl.textContent = "Highscores";
    highscores.appendChild(highscoreEl);


}


// Display next Question
function displayNextQuest() {
    // Clears out the page each time you go to another section
    questionsEl.textContent = "";
    newDiv = document.createElement("h2");
    newDiv.textContent = questions[index].question;
    console.log(questions[index].question)
    questionsEl.appendChild(newDiv);
    newDiv.setAttribute("data-state", "visible");
    
    
    for(var i = 0; i < questions[index].answers.length; i++) {
        
        multipleChoiceOptions = document.createElement("button");
        multipleChoiceOptions.textContent = questions[index].answers[i];
        questionsEl.appendChild(multipleChoiceOptions);
        multipleChoiceOptions.setAttribute("data-state", "visible")
        multipleChoiceOptions.setAttribute("id", "option-button");
         
    
        
        multipleChoiceOptions.addEventListener("click", clickAnswer);
        
    }
    
    // questionsEl.textContent = questOne.question;
};

function clickAnswer() {

    if(newDiv.dataset.state === "visible" && multipleChoiceOptions.dataset.state === "visible") {
        newDiv.setAttribute("data-state", "hidden");
        newDiv.setAttribute("style", "display: none;")
        multipleChoiceOptions.setAttribute("data-state", "hidden");
        multipleChoiceOptions.setAttribute("style", "display: none;")

    }
   
    if (this.textContent === questions[index].correct) {
        
        rightOrWrong.textContent = "Correct!";
        
        answeredCorrectly++;
        
    } else {
        
        rightOrWrong.textContent = "Incorrect!";
        count -=10;
        
    } 
    rightOrWrong.style = "display:block";
    setTimeout(function () {
        rightOrWrong.style = "display: none";
    }, 1000);

    index++;
    if(index === questions.length) {
        endGame();
    } else{
        displayNextQuest();
    }
};


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

    intervalId = setInterval(function () {
        count--;
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



