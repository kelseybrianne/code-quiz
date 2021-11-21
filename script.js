var timer = document.getElementById("timer");
var startBtn = document.getElementById("start-game");
var intro = document.getElementById("intro");
var questionsEl = document.getElementById("questions");
var initialsEl = document.getElementById("enter-initials");
var highscoresEl = document.getElementById("highscores");
var hsListEl = document.getElementById("highscore-list");
var rightOrWrong = document.getElementById("right-or-wrong")
var formEl = document.getElementById("form")
var navBtns = document.getElementById("final-nav");
var hsPage = document.getElementById("highscore-page");
var newInput;
var index = 0;
var newDiv;
var allDoneEl;
var multipleChoiceOptions;
var allQuestions;
var intervalId;
var submitBtn;
var highscoreEl;
var newForm;

var time = "Time: ";
var count = 60;
var score;
var answeredCorrectly = 0;
var intervalId;
var highscores = [];
timer.textContent = time + count;



function endGame() {
    // make this page an empty string when first opened to clear the last page
    questionsEl.textContent = "";
    clearInterval(intervalId);

    score = count + answeredCorrectly;
    
    allDoneEl = document.createElement("h2");
    allDoneEl.textContent = "All done!"  
    initialsEl.appendChild(allDoneEl);
    var newP = document.createElement("p");
    newP.textContent = `Your final score is ${score}.`
    console.log(count);
    initialsEl.appendChild(newP);
    var enterInitialsEl = document.createElement("label");
    enterInitialsEl.setAttribute("class", "inline");
    enterInitialsEl.textContent = "Enter your initials: "
    formEl.appendChild(enterInitialsEl);
    
    newInput = document.createElement("input");
    formEl.appendChild(newInput);
    submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    formEl.appendChild(submitBtn);

    formEl.addEventListener("submit", submit);
  
    
}

var highscoreText
function submit() {
    event.preventDefault();
    highscoreText = newInput.value.trim() + " - " + score;

    if (highscoreText === "") {
        return;
    }

    highscores.push(highscoreText);
    // newInput.value = "";

    storeHighscores();
    renderHighscores();
}

function storeHighscores () {
    localStorage.setItem("highscores", JSON.stringify(highscores));
};

function renderHighscores () {
    initialsEl.setAttribute("style", "display: none;");
    formEl.setAttribute("style", "display: none;");
  
    timer.setAttribute("class", "hidden");
    highscoreEl = document.createElement("h2");
    highscoreEl.textContent = "Highscores";
    highscoresEl.appendChild(highscoreEl);
    var goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go Back";
    navBtns.appendChild(goBackBtn);
    var clearHighscoresBtn = document.createElement("button");
    clearHighscoresBtn.textContent = "Clear Highscores"
    navBtns.appendChild(clearHighscoresBtn);
    hsListEl.classList.remove("hidden");
    
    for (var i=0; i<highscores.length; i++) {
        var highscore = highscores[i];
        
        var newHighscore = document.createElement("li");
        newHighscore.textContent = highscore;
        hsListEl.appendChild(newHighscore);
    }

    clearHighscoresBtn.addEventListener("click", function() {
        highscores = []
        newHighscore.textContent = "";
        hsListEl.setAttribute("class", "hidden");
    })

    goBackBtn.addEventListener("click", function() {
        intro.classList.remove("hidden");
        highscoreEl.setAttribute("class","hidden");
        hsListEl.setAttribute("class","hidden");
        formEl.setAttribute("class","hidden");
        navBtns.setAttribute("class","hidden");
    })
}


function init() {
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }
    renderHighscores();
}


// Display next Question
function displayNextQuest() {
    // Clears out the page each time you go to another section
    questionsEl.textContent = "";
    newDiv = document.createElement("h2");
    newDiv.textContent = questions[index].question;
    console.log(questions[index].question);
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
            endGame();
        }
    }, 1000);

}


// Start timer, hide intro, and display next question
function startGame() {
    
    startTimer();
    
    // Hide intro
    intro.setAttribute("class", "hidden")

    displayNextQuest();

};



