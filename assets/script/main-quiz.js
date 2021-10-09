// global variables -- rename them !!

const question = document.querySelector('#question'); // a variable that stores a question found based on id
const options = Array.from(document.querySelectorAll('.option-text')); // creating array using class name and storing it in a variable choices found by class name
const progressText = document.querySelector('#progress-text'); // variable that shows progress 
const scoreText = document.querySelector('#score'); // variable that shows users score 
const progressBarFull = document.querySelector('#progress-full'); // variable that shows when quiz is on last question the progress bar is full

// creating an empty dictionary for question and answers connected to the question
let currentQuestion = {};
// declaring a constant variable that stores the true value of answers being accepted
let acceptingAnswers = true;
// a global variable that stores a starting value of a score
let score = 0;
// a global variable that stores looping through questions
let questionCount = 0;
// an empty array that stores values of leftover questions through a function getNewQuestion()
let availableQuestions = [];

// array of questions and a dictionary of question, choices and correct answers
let questions = [{
        question: 'Which one of these is in fact a berry?',
        option1: 'Cherry',
        option2: 'Strawberry',
        option3: 'Cantaloupe',
        option4: 'Raspberry',
        answer: 3,
    },
    {
        question: 'Which vegetable contains more protein per calorie than animal based protein?',
        option1: 'Carrot',
        option2: 'Broccolli',
        option3: 'Leek',
        option4: 'Spinach',
        answer: 2,
    },
    {
        question: 'Which one of these is in fact a fruit?',
        option1: 'Pecan Nut',
        option2: 'Pistachio',
        option3: 'Walnut',
        option4: 'Almond',
        answer: 2,
    },
    {
        question: 'Which fruit has better effect on your energy level than coffee?',
        option1: 'Apple',
        option2: 'Orange',
        option3: 'Grapes',
        option4: 'Nectarine',
        answer: 1,
    },
    {
        question: 'Which nut butter helps in type 2 diabetes prevention, aids weigh-loss and glows in dark after exposed to intense light?',
        option1: 'Almond Butter',
        option2: 'Cashew Butter',
        option3: 'Hazelnut Butter',
        option4: 'Peanut Butter',
        answer: 4,
    },
    {
        question: 'Which one of these berries lowers blood pressure and also can improve your mood?',
        option1: 'Gooseberry',
        option2: 'Kiwi',
        option3: 'Banana',
        option4: 'Watermelon',
        answer: 3,
    },
    {
        question: 'Which vegetable is declared the "most hated vegetable" according to many studies?',
        option1: 'Brussel Sprouts',
        option2: 'Beetroot',
        option3: 'Cabbage',
        option4: 'Kale',
        answer: 1,
    },
    {
        question: 'Which one of these is considered "nutraceutical", meaning it can prevent and treat disease?',
        option1: 'Grapefruit',
        option2: 'Pear',
        option3: 'Mandarin',
        option4: 'Apricot',
        answer: 1,
    },
    {
        question: 'Which one of these herbs boosts memory, heals cancer, relieve pain and protect immune system',
        option1: 'Mint',
        option2: 'Rosemary',
        option3: 'Thyme',
        option4: 'Basil',
        answer: 2,
    }
]

// a global unchanging variables to store points and maximum number of questions
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 9;

//** Function that starts the quiz and adds next remaining questions */ 
function startQuiz() {
    // Set the counter and score to start with 0
    questionCount = 0;
    score = 0;
    // Use of spread method to pick up each remaining item and create an array  
    availableQuestions = [...questions];
    // Calling function to get next question
    getNewQuestion();
};

//** Creating a function that takes available question as next question */
function getNewQuestion() {
    // If there is no more questions or the counter is bigger than maximum of questions
    if (availableQuestions.length == 0 || questionCount > MAX_QUESTIONS) {
        // A new variable stores score added through questions loop
        localStorage.setItem('lastScore', score);
        // The final score stored is saved in the save-score.html window storage
        return window.location.assign('/save-score.html');
    }

    // Adding next question using shorthand expression
    questionCount++;
    // The display of current question number of total number of questions
    progressText.innerText = `Question ${questionCount} of ${MAX_QUESTIONS}`;
    // Dynamically styling progress bar to show how close to finishing the quiz, fiiling up with color more with each new question 
    progressBarFull.style.width = `${(questionCount/MAX_QUESTIONS) * 100}%`;

    // Using random method from Math module to get random number of index of the question, for questions to be scattered and harder to remember
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    // Setting current question to an index of the available question
    currentQuestion = availableQuestions[questionsIndex];
    // Display the text of the string in the question variable !! Ask Tim ***** Inspect says that question is not a function - true
    question.innerText = currentQuestion.question;

    // Looping through options based on value data of number next to it
    options.forEach(option => {
        // Set number variable to dataset value of option variable based on option-number
        const number = option.dataset['number'];
        // Set text of the option to the value of current number of the question
        option.innerText = currentQuestion['option' + number];
    });
    /* A new array of questions that are left to be answered is created and first 
    indexed question is used */
    availableQuestions.splice(questionsIndex, 1);
    // as long as there is another question to ask, keep 
    acceptingAnswers = true;
};
/**Looping through options using arrow function and for each option clicked and 
 * listened to, function is checking if there are more answers to click to
 */
options.forEach(option => {
    option.addEventListener('click', e => {
        // If there is no more answers then function is stopped with nothing else to return
        if (!acceptingAnswers) return;
        // Declare variable to false since there is no more questions left to loop through 
        acceptingAnswers = false;
        // Declare targeted event as selected option 
        const selectedOption = e.target;
        /* Declare chosen answer according to property of dataset targeting the number of the 
        option selected */
        const selectedAnswer = selectedOption.dataset['number'];
        /* Declare variable specific to this block scope that takes the class value 
         of an answer and in ternary expression a condition of correct or incorrect is calling
        the class name */
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        /* Declare a variable specific to this block scope that we will use in the future and 
        initially it is a string type of variable */
        let correctAnswer = "";
        /* Conditional expression to check if class applied chosen by the answer is strictly
        equal to correct and if so - call the function that adds the score */
        if (classToApply === 'correct') {
            addTheScore(SCORE_POINTS);
            /* Otherwise correctAnswer variable is targeted by a class of answered question and 
            its index value of an answer in currentQuestion dictionary */
        } else {
            correctAnswer = document.querySelector(`.option-text[data-number="${currentQuestion.answer}"]`);
            /* correctAnswer is a child element of a list so we are calling the parent class to 
            add all correct answers */
            correctAnswer.parentElement.classList.add('correct');
        }
        // selectedOption is calling a class to be applied and added to a list after event clicked 
        selectedOption.parentElement.classList.add(classToApply);
        /**
         * Creating an arrow function to set how long will it take until the questions switch 
         * to next one
         */
        setTimeout(() => {
            // Removing the options after selected one is clicked
            selectedOption.parentElement.classList.remove(classToApply);
            // Conditional to value of class name of incorrect
            if (classToApply == 'incorrect') {
                // Code that belongs to this part of a list class is removed
                correctAnswer.parentElement.classList.remove('correct');
            };
            // A function to call next Question is called
            getNewQuestion();
            // Duration of the wait to next question
        }, 1500);
    });
});
/* Using arrow function to assign a num variable to be incremented by next score and write 
it into HTML */
addTheScore = num => {
    score += num;
    scoreText.innerText = score;
}
// Call a function to start the Quiz
startQuiz();