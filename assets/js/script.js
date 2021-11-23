var timer = document.getElementById("timer");
var intro = document.getElementById("intro");
var questionsEl = document.getElementById("questions");
var initialsEl = document.getElementById("enter-initials");
var highscoresEl = document.getElementById("highscores");
var hsListEl = document.getElementById("highscore-list");
var rightOrWrong = document.getElementById("right-or-wrong")
var formEl = document.getElementById("form")
var navBtns = document.getElementById("final-nav");
var newInput;
var intervalId;
var score;

var index = 0;
var time = "Time: ";
var count = 60;
var answeredCorrectly = 0;
var highscores = [];
timer.textContent = time + count;

var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
if (storedHighscores !== null) {
    highscores = storedHighscores;
}

// Create a button in the top left corner for user to view highscores at any point in time.
document.getElementById("view-highscores").addEventListener("click", function() {
    
    renderHighscores();
    intro.setAttribute("class", "hidden");
    questionsEl.setAttribute("class", "hidden");
    
});

// Show list of high scores and two buttons, one clicked to go back to the start of the quiz and the other to clear the highscores.
function renderHighscores () {
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }
    
    initialsEl.setAttribute("style", "display: none;");
    formEl.setAttribute("style", "display: none;");
    
    timer.setAttribute("class", "hidden");
    var highscoreEl = document.createElement("h2");
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
        
        hsListEl.textContent = "";
        highscoreEl.textContent = "";
        highscoresEl.textContent = "";
        navBtns.textContent = "";
        highscores = []
    
        localStorage.setItem("highscores", JSON.stringify(highscores));
        renderHighscores();
        
        var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
        if (storedHighscores !== null) {
            highscores = storedHighscores;
        }
    })
    
    goBackBtn.addEventListener("click", function() {
        location.reload();
    })
};

// Save initials and highscore to localStorage and show list of highscores when submitted
function submit(event) {
    event.preventDefault();
    var highscoreText = newInput.value.trim().toUpperCase() + " - " + score;
    
    if (newInput.value.trim() === "") {
        return;
    }

    highscores.push(highscoreText);
    
    localStorage.setItem("highscores", JSON.stringify(highscores));

    renderHighscores();
}
    
// Display the final score and create an input for user to save their highscore.
function endGame() {
    // Make this page an empty string when first opened to clear the last page
    questionsEl.textContent = "";
    clearInterval(intervalId);

    score = count + answeredCorrectly;
    
    var allDoneEl = document.createElement("h2");
    allDoneEl.textContent = "All done!"  
    initialsEl.appendChild(allDoneEl);
    var newP = document.createElement("p");
    newP.textContent = `Your final score is ${score}.`
    initialsEl.appendChild(newP);
    var enterInitialsEl = document.createElement("label");
    enterInitialsEl.setAttribute("class", "inline");
    enterInitialsEl.textContent = "Enter your initials: "
    formEl.appendChild(enterInitialsEl);
    
    newInput = document.createElement("input");
    formEl.appendChild(newInput);
    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    formEl.appendChild(submitBtn);
    
    formEl.addEventListener("submit", submit);
}

// When you answer every question, display the next question and whether the previously selected answer was right or wong. End the game after the last question.
function clickAnswer() {
    if (this.textContent === questions[index].correct) {
        rightOrWrong.textContent = "Correct!";
        answeredCorrectly++;
    } else {
        rightOrWrong.textContent = "Incorrect!";
        count -=10;
    } 

    rightOrWrong.style = "display:block";

    // Make the correct/incorrect statement disappear after one second
    setTimeout(function () {
        rightOrWrong.style = "display: none";
    }, 1000);
    
    // End the game when you run out of questions
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
    
// Display next Question
function displayNextQuest() {
    // Clears out the page each time you go to another section
    questionsEl.textContent = "";

    var newDiv = document.createElement("h2");
    newDiv.textContent = questions[index].question;
    questionsEl.appendChild(newDiv);
    
    // Put the answer to each question in its own button and each with the same click event functionality
    for(var i = 0; i < questions[index].answers.length; i++) {
        var multipleChoiceOptions = document.createElement("button");
        multipleChoiceOptions.textContent = questions[index].answers[i];
        questionsEl.appendChild(multipleChoiceOptions);
        multipleChoiceOptions.setAttribute("data-state", "visible")
        multipleChoiceOptions.setAttribute("id", "option-button");
        
        multipleChoiceOptions.addEventListener("click", clickAnswer);
    }
};
    
// Start timer, clear it and end game at 0
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

// Add Start Quiz button click functionality
document.getElementById("start-game").addEventListener("click", startGame);
