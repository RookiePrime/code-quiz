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
    }
];

let scores = [];
let score = 0;
let time;
// Difficulty options
let timeDifficulty = [40, 30, 20, 10]

// The place to put questions on the page
const sectionEl = document.querySelector("#quiz-box");

// The timer element
const  timerEl = document.querySelector("#timer");

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
    // Add them to the page
    startBoxEl.appendChild(startRulesEl);
    startBoxEl.appendChild(startReadyEl);
    startBoxEl.appendChild(startBtnEl);

    sectionEl.appendChild(startBoxEl);
};

const askQuestion = () => {
    // First of all, remove the existing question, if there is one
    if (document.querySelector("#question-box")) {
        document.querySelector("#question-box").remove();
    }


    // First, pick a question from the questions array
    const randomQ = Math.floor(Math.random() * questions.length);
    const question = questions[randomQ];
    
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
    const endInitialsEl = document.createElement("input");
    const endBtnEl = document.createElement("input");

    endEl.id = "ending-box"
    endH2El.textContent = "The quiz is over! Let's see how you did!";
    endPEl.textContent = "Your score is " + score + ".";
    endInitPEl.textContent = "Type in your initials:";
    endInitialsEl.setAttribute("name", "initials");
    endInitialsEl.setAttribute("type", "text");
    endBtnEl.setAttribute("type", "submit");
    endBtnEl.setAttribute("minlength", "1");
    endBtnEl.setAttribute("maxlength", "5");
    endBtnEl.textContent = "Submit";

    // Put the elements on the screen
    endEl.appendChild(endH2El);
    endEl.appendChild(endPEl);

    endFormEl.appendChild(endInitPEl);
    endFormEl.appendChild(endInitialsEl);
    endFormEl.appendChild(endBtnEl);
    endEl.appendChild(endFormEl);

    sectionEl.appendChild(endEl);
}

const startQuiz = () => {
    // First, remove the starting text and button, to clear the space and prevent people from starting a quiz in the middle of a quiz.
    const startBox = document.querySelector("#start-box");
    startBox.remove();
    
    // Then, start the timer, and when it reaches 0, end the quiz
    timerEl.setAttribute("style", "display: block");
    timerEl.textContent = time;
    time = timeDifficulty[3];

    const timer = setInterval(function() {
        timerEl.textContent = time;
        time--;
        if (time < 0) {
            timerEl.setAttribute("style", "display: none");
            clearInterval(timer);
            endQuiz();
        }
        
    }, 1000);

    // Then, ask a question
    askQuestion();
};

// Shows the high scores
const showHighScores = () => {
    const startBox = document.querySelector("#start-box");
    startBox.remove();

    // Create all the elements to put to the page
    const scoreBoxEl = document.createElement("div");
    const scoreH2El = document.createElement("h2");
    const scoreListEl = document.createElement("ol");

    for (let i = 0; i < scores.length; i++) {
        // Within this loop, we do the whole create, attribute, append thing per score
        const scoreItemEl = document.createElement("li");
        const scoreEl = document.createElement("p")
        const scoreInitEl = document.createElement("span");

        scoreEl.textContent = scores[i].score;
        scoreInitEl.textContent = scores[i].initials;

        scoreEl.appendChild(scoreInitEl);
        scoreItemEl.appendChild(scoreEl);
        scoreListEl.appendChild(scoreItemEl);
    }

    // Then give them attributes and content
    scoreBoxEl.id = "score-box";
    scoreH2El.textContent = "High Scores"

    // Then append them to the page
    scoreBoxEl.appendChild(scoreH2El);
    scoreBoxEl.appendChild(scoreListEl);
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

// When you click the quiz box and it's a correct answer, you get a point. If it's just an answer and not correct, no point. Either way, time to move onto the next question.
document.querySelector("#quiz-box").addEventListener("click", function(event) {
    const clickedEl = event.target;

    if (clickedEl.id === "start-btn") {
        startQuiz();
    } else if (clickedEl.className === "answer") {
        if (clickedEl.id === "correct") {
            score++;
        }

        askQuestion();
    } else if (clickedEl.id === "high-scores") {
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
        console.log(scores);
        saveScores();
        document.querySelector("#ending-box").remove();
        startPage();
    }
});

// When you click the start button, you start the quiz
// document.querySelector("#start-btn").addEventListener("click", startQuiz);

loadScores();
startPage();