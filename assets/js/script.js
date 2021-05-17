const questions = [
    {
        question: "Which of these is not a variable type?",
        answers: ["Boolean", "Caspian", "Number", "String"],
        correctAnswer: 1
    },
    {
        question: "JSON is an abbreviation. What is JSON an abbreviation of?",
        answers: [
            "Java Scripting-Oriented Numeration", 
            "Jquery Summary Object Notation", 
            "JavaScript Object Notation", 
            "Jerry's Symposion Of Nickels"
        ],
        correctAnswer: 2
    },
    {
        question: "What is a string?",
        answers: [
            "A data-type containing a sequence of characters",
            "A method that converts an object to text that can be stored",
            "The contents of an HTML element created in JavaScript",
            "A string of characters used to uniquely identify an element"
        ],
        correctAnswer: 0
    },
    {
        question: "What selector do you use to create a CSS variable?",
        answers: [
            ":hover",
            ":focus",
            ":after",
            ":root"
        ],
        correctAnswer: 3
    },
    {
        question: "Which of these is a correctly written use of the ternary operator?",
        answers: [
            "numberOfDays >= 7 ? baconEaten++ : hunger++;",
            "if (numberOfDays >= 7) { baconEaten++ } else { hunger++ }",
            "if numberOfDays >= 7 ? baconEaten++ else hunger++",
            "numberOfDays >= 7 { baconEaten++ } : hunger++;"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of these is not a term in the JavaScript programming language?",
        answers: [
            "Switch", "For", "Do", "When"
        ],
        correctAnswer: 3
    },
    {
        question: "Which symbol is used for a modulus operation in JavaScript?",
        answers: [
            "^", "%", "A single &", "?"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of these is not correct syntax for an arrow function?",
        answers: [
            "function thingy(c) { return something };",
            "const thingy = x => { return something };",
            "const thingy = z => something;",
            "let thingy = (a, b) => { return something };"
        ],
        correctAnswer: 0
    },
    {
        question: "How many times can an 'if' statement be extended with 'else if' statements?",
        answers: [
            "Only once", "255 times", "Infinitely", "8 times"
        ],
        correctAnswer: 2
    },
    {
        question: "What happens when a program runs a loop with an end condition it can never achieve?",
        answers: [
            "It loops 255 times, escapes and returns an error",
            "It loops until the browser stops it; how long that takes depends on the browser",
            "It doesn't loop",
            "It loops indefinitely"
        ],
        correctAnswer: 3
    },
    {
        question: "Which of the following is not a valid declaration?",
        answers: [
            "let x = 0",
            "perm z = []",
            "const y = {}",
            "var a = 'fire'"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of these HTML element enables the import of third-party JavaScript APIs?",
        answers: [
            "<script>", "<link>", "<blink>", "<iframe>"
        ],
        correctAnswer: 0
    },
    {
        question: "What does the 'switch' statement do?",
        answers: [
            "It inverts a boolean value, switching it from false to true or true to false",
            "It revises the condition of a loop so that it can end later or sooner, as needed",
            "It evaluates a condition and provides executes different outcomes based on said evaluation",
            "It enables an API exclusively for use in applications made for the Nintendo Switch"
        ],
        correctAnswer: 2
    },
    {
        question: "What method is used to program a callback function to the click of a button on a webpage?",
        answers: [
            ".addClass()", ".setAttribute()", ".event()", ".addEventListener()"
        ],
        correctAnswer: 3
    },
    {
        question: "What is an argument in JavaScript?",
        answers: [
            "A value provided to an If, While, or Switch statement that is evaluated to determine what part of the code runs next",
            "One or more variables included in a method call, to act as parameters for that method",
            "A kind of error that results from the code being unable to determine which variable to use for an operation",
            "A fundamental feature of JavaScript that contains the data for a user's input in an application"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of these expressions evaluates to 'false'?",
        answers: [
            "!'0'", "!null", "!undefined", "!0"
        ],
        correctAnswer: 0
    }
];
// Start application with a duplicate array of the questions, so that questions can be removed from it over time until none remain
const questionsToAsk = [];

const fillQuestionsToAsk = () => {
    for (let i = 0; i < questions.length; i++) {
        questionsToAsk.push(questions[i]);
    }
};

let scores = [];
let score = 0;
let time = 60;
// Difficulty options
let timeBase = 60;

// The place to put questions on the page
const sectionEl = document.querySelector("#quiz-box");

// The timer element
const  timerEl = document.querySelector("#timer");

// The high score element
const highScoresEl = document.querySelector("#high-scores");

// When the page first loads and when the score is submitted, the start page is loaded
const startPage = () => {
    // Create the elements to put on the page
    const startBoxEl = document.createElement("div");
    const startRulesEl = document.createElement("h2");
    const startReadyEl = document.createElement("h2");
    const startBtnEl = document.createElement("button");
    // Give them their various attributes
    startBoxEl.id = "start-box";
    startRulesEl.textContent = "Prepare yourself for a timed quiz challenge! You'll have 30 seconds to answer as many questions as you can. Correct answers are worth 1 point. See if you can beat the high score!";
    startReadyEl.textContent = "Are you ready to start?";
    startReadyEl.className = "ready-h2";
    startBtnEl.textContent = "Start";
    startBtnEl.id = "start-btn";
    startBtnEl.className = "button-style";
    // Add them to the page
    startBoxEl.appendChild(startRulesEl);
    startBoxEl.appendChild(startReadyEl);
    startBoxEl.appendChild(startBtnEl);

    sectionEl.appendChild(startBoxEl);

    // Make the high score button appear, in case it wasn't already there
    document.querySelector("#high-scores").setAttribute("style", "display: block");
};

const askQuestion = () => {
    // First of all, remove the existing question, if there is one
    if (document.querySelector("#question-box")) {
        document.querySelector("#question-box").remove();
    }

    // Check if the array is empty. If it is, the quiz is over!
    if (questionsToAsk.length === 0) {
        time = -1;
        return;
    }

    // Pick a question from the questions array
    const randomQ = Math.floor(Math.random() * questionsToAsk.length);
    const question = questionsToAsk[randomQ];

    // Delete the question from the array so it's not asked again
    questionsToAsk.splice(randomQ, 1);

    // Then, create the elements necessary for the question to appear on the page, and put the question and its answers in the elements
    const questionBoxEl = document.createElement("div");
    questionBoxEl.id = "question-box";
    
    const questionEl = document.createElement("h2");
    questionEl.id = "question";
    questionEl.textContent = question.question;
    
    // This loops through all the answers and creates a list containing them. Li and Ul stuff
    const answersUlEl = document.createElement("ul");
    answersUlEl.id = "answers";
    for (let i = 0 ; i < question.answers.length ; i++) {
        const answerEl = document.createElement("li");
        answerEl.className = "answer";
        if (i === question.correctAnswer) {
            answerEl.id = "correct";
        }
        answerEl.textContent = question.answers[i];
        answersUlEl.appendChild(answerEl);
    }
    // Roll all the elements together into one big package
    questionBoxEl.appendChild(questionEl);
    questionBoxEl.appendChild(answersUlEl);
    // Then apply the elements to the page
    sectionEl.appendChild(questionBoxEl);
    
};

const endQuiz = () => {
    // If there's a question on the screen still, get rid of it.
    if (document.querySelector("#question-box")) {
        document.querySelector("#question-box").remove();
    }

    // Set up the bones of the end screen. All the elements of it.
    const endEl = document.createElement("div");
    const endH2El = document.createElement("h2");
    const endPEl = document.createElement("p");
    const endFormEl = document.createElement("form");
    const endInitPEl = document.createElement("p");
    const endInputEl = document.createElement("input");
    const endBtnEl = document.createElement("input");

    endEl.id = "ending-box"
    endH2El.textContent = "The quiz is over! Let's see how you did!";
    endPEl.textContent = "Your score is " + score + ".";
    endInitPEl.textContent = "Type in your initials:";
    endInputEl.setAttribute("name", "initials");
    endInputEl.setAttribute("type", "text");
    endBtnEl.setAttribute("type", "submit");
    endBtnEl.setAttribute("minlength", "1");
    endBtnEl.setAttribute("maxlength", "5");
    endBtnEl.textContent = "Submit";
    endBtnEl.className = "button-style";

    // Put the elements on the screen
    endEl.appendChild(endH2El);
    endEl.appendChild(endPEl);

    endInitPEl.appendChild(endInputEl);
    endInitPEl.appendChild(endBtnEl);
    endFormEl.appendChild(endInitPEl);
    // endFormEl.appendChild(endBtnEl);
    endEl.appendChild(endFormEl);

    sectionEl.appendChild(endEl);
}

const startQuiz = () => {
    // First, remove the starting text and button, to clear the space and prevent people from starting a quiz in the middle of a quiz.
    const startBox = document.querySelector("#start-box");
    startBox.remove();

    // hide the high score button, so people don't look at the scores instead of taking the quiz
    document.querySelector("#high-scores").setAttribute("style", "display: none");

    // Then, start the timer, and when it reaches 0, end the quiz
    timerEl.setAttribute("style", "display: block");
    timerEl.textContent = time;
    time = timeBase;

    const timer = setInterval(function() {
        timerEl.textContent = time;
        time--;
        if (time < 0) {
            timerEl.setAttribute("style", "display: none");
            clearInterval(timer);
            endQuiz();
        }
        
    }, 1000);

    // Put all the questions in the array before we start
    fillQuestionsToAsk();

    // Then, ask a question
    askQuestion();
};

// Shows the high scores
const showHighScores = () => {
    const startBox = document.querySelector("#start-box");
    if (startBox) startBox.remove();

    // Create all the elements to put to the page
    const scoreBoxEl = document.createElement("div");
    const scoreH2El = document.createElement("h2");
    const eraseBtnEl = document.createElement("button");
    const scoreListEl = document.createElement("ol");

    if (scores.length) {
        for (let i = 0; i < scores.length; i++) {
            // Within this loop, we do the whole create, attribute, append thing per score
            const scoreItemEl = document.createElement("li");
            const scoreEl = document.createElement("p")
            const scoreInitEl = document.createElement("span");
    
            scoreEl.textContent = scores[i].score;
            eraseBtnEl.textContent = "Clear Scores";
            eraseBtnEl.id = "clear-scores";
            eraseBtnEl.className = "button-style";
            scoreInitEl.textContent = scores[i].initials;
    
            scoreItemEl.appendChild(scoreInitEl);
            scoreItemEl.appendChild(scoreEl);
            scoreListEl.appendChild(scoreItemEl);
        }
        // Then give them attributes and content
        scoreBoxEl.id = "score-box";
        scoreH2El.textContent = "High Scores"
    
        // Then append them to the page
        scoreBoxEl.appendChild(scoreH2El);
        scoreBoxEl.appendChild(eraseBtnEl);
        scoreBoxEl.appendChild(scoreListEl);
    } else {
        const noScoresEl = document.createElement("p");
        noScoresEl.className = "button-style";
        noScoresEl.textContent = "There are no scores!";

        scoreBoxEl.id = "score-box";
        scoreH2El.textContent = "High Scores"

        scoreBoxEl.appendChild(scoreH2El);
        scoreBoxEl.appendChild(noScoresEl);
    }
    
    sectionEl.appendChild(scoreBoxEl);
};

// Returns whether or not the user picked the right choice. In a single line of code! How's that for efficient functioning? Arrow Function + Ternary Operator.
const isCorrect = clickedEl => clickedEl.className === "correct" ? true : false;

// If there's no scores, an empty array is created.
const loadScores = () => {
    scores = JSON.parse(localStorage.getItem("scores"));

    if (!scores) {
        scores = [];
    }
};

const saveScores = () => {
    localStorage.setItem("scores", JSON.stringify(scores));
};

// Sorts the scores from highest to lowest
const sortScores = () => {
    scores.sort(function compare(a, b) {
        const score1 = a.score;
        const score2 = b.score
        if (score1 > score2) return -1;
        if (score1 < score2) return 1;
        return 0;
    });
};

// If you wanna go back to the quiz, delete the score page and draw the start page again
const backToQuiz = () => {
    document.querySelector("#score-box").remove();
    startPage();
};

// Makes "Correct!" or "Incorrect!" appear when the user picks an answer
const showRightness = correctness => {
    // Delete the old one if it's still there
    if (document.querySelector("#correctness")) {
        document.querySelector("#correctness").remove();
    }

    const textEl = document.createElement("h2");
    textEl.id = "correctness";

    if (correctness) {
        textEl.textContent = "Correct!";
    } else {
        textEl.textContent = "Incorrect!";
    }

    sectionEl.appendChild(textEl);
    textEl.animate([
        { opacity: "0" },
        { opacity: "1" },
        { opacity: "0" }
    ], {
        duration: 2000
    });
    setTimeout(function() {
        textEl.remove();
    }, 2000);
}

// When you click the quiz box and it's a correct answer, you get a point. If it's just an answer and not correct, no point. Either way, time to move onto the next question.
document.querySelector("#quiz-box").addEventListener("click", function(event) {
    const clickedEl = event.target;

    if (clickedEl.id === "start-btn") {
        startQuiz();
    } else if (clickedEl.className === "answer") {
        // Your score goes up if you're right, and moreso if you're in the next level -- and as the levels go up, so do the penalties for wrong answers. Gotta be fast, gotta be right!
        if (clickedEl.id === "correct") {
            score++;
            showRightness(true);
        } else {
            showRightness(false);
        }

        askQuestion();
    } else if (clickedEl.id === "high-scores") {

        if (highScoresEl.textContent === "see high scores") {
            highScoresEl.textContent = "back to quiz";
            showHighScores();
        } else {
            highScoresEl.textContent = "see high scores";
            backToQuiz();
        }
    } else if (clickedEl.id === "clear-scores") {
        scores = [];
        localStorage.removeItem("scores");
        document.querySelector("#score-box").remove();
        showHighScores();
    }
});

document.querySelector("#quiz-box").addEventListener("submit", function(event) {
    event.preventDefault();
    const clickedEl = event.target;
    // If you clicked to submit your score, it's added to the loaded scores, which are then saved
    if (clickedEl.querySelector("input[type=submit]")) {
        const initialsEl = document.querySelector("input[type=text]");
        const initials = initialsEl.value;
        
        const newScore = {
            initials: initials,
            score: score
        }

        scores.push(newScore);
        sortScores();
        saveScores();
        document.querySelector("#ending-box").remove();
        startPage();
    }
});

// When you click the start button, you start the quiz
// document.querySelector("#start-btn").addEventListener("click", startQuiz);

loadScores();
startPage();