# What starting data does my application need to run?

- Questions and Answers
    - Array list for our series of questions
    - Each question will be an object
        ```
        {
            question: "Commonly used data types DO NOT include:",
            multipleChoiceOptions: ["strings", "booleans", "alerts", "numbers"]
            correct: "alerts"
        }
        ```
- Timer/Score 

    - setInterval

# What kinds of actions does my application need to do?

- start action
function startGame () { ... }✅

    - hide welcome:
    function hideWelcome () { ... } ✅

    - display the next question:
    function displayNextQuestion () { ... } ✅

    - start the countdown timer ✅


- answer a question ✅

    - validate the users choice (display the answer result)✅

        - IF the choice is wrong, subtract time by 10 ✅

    - display the next question✅

    - display the answer result✅

- end the game

    - Stop the timer from counting down (clearInterval) ✅

    - Display All done/Time's up page ✅

- Highscores

    - Display HighScores page



# Tips

- All functions need to be declared globally and then only MODIFIED/defined locally.