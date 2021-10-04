// global variables -- rename them !!

const question = document.querySelector('#question'); // a variable that stores a question found based on id
const choices = Array.from(document.querySelectorAll('.choice-text')); // creating array using class name and storing it in a variable choices found by class name
const progressText = document.querySelector('#progress-text'); // variable that shows progress 
const scoreText = document.querySelector('#score'); // variable that shows users score 
const progressBarFull = document.querySelector('#progress-bar-full'); // variable that shows when quiz is on last question the progress bar is full

// creating an empty array for questions
let currentQuestion = {};
// declaring a global variable that stores answers accepted
let acceptingAnswers = true;
// a global variable that stores a starting value of a score
let score = 0;
// a global variable that stores looping through questions
let questionCount = 0;
// an empty array that stores values of leftover questions within a function getNewQuestion()
let availableQuestions = [];

// array of questions and correct answers
let questions = [{
        question: 'Which one of these is in fact a berry?',
        choice1: 'Cherry',
        choice2: 'Strawberry',
        choice3: 'Cantaloupe',
        choice4: 'Raspberry',
        answer: 3,
    },
    {
        question: 'Which vegetable contains more protein per calorie than animal based protein?',
        choice1: 'Carrot',
        choice2: 'Broccolli',
        choice3: 'Leek',
        choice4: 'Spinach',
        answer: 2,
    },
    {
        question: 'Which one of these is in fact a fruit?',
        choice1: 'Pecan Nut',
        choice2: 'Pistachio',
        choice3: 'Walnut',
        choice4: 'Almond',
        answer: 2,
    },
    {
        question: 'Which fruit has better effect on your energy level than coffee?',
        choice1: 'Apple',
        choice2: 'Orange',
        choice3: 'Grapes',
        choice4: 'Nectarine',
        answer: 1,
    },
    {
        question: 'Which nut butter helps in type 2 diabetes prevention, aids weigh-loss and glows in dark after exposed to intense light?',
        choice1: 'Almond Butter',
        choice2: 'Cashew Butter',
        choice3: 'Hazelnut Butter',
        choice4: 'Peanut Butter',
        answer: 4,
    },
    {
        question: 'Which one of these berries lowers blood pressure and also can improve your mood?',
        choice1: 'Gooseberry',
        choice2: 'Kiwi',
        choice3: 'Banana',
        choice4: 'Watermelon',
        answer: 3,
    },
    {
        question: 'Which vegetable is declared the "most hated vegetable" according to many studies?',
        choice1: 'Brussel Sprouts',
        choice2: 'Beetroot',
        choice3: 'Cabbage',
        choice4: 'Kale',
        answer: 1,
    },
    {
        question: 'Which one of these is considered "nutraceutical", meaning it can prevent and treat disease?',
        choice1: 'Grapefruit',
        choice2: 'Pear',
        choice3: 'Mandarin',
        choice4: 'Apricot',
        answer: 1,
    },
    {
        question: 'Which one of these herbs boosts memory, heals cancer, relieve pain and protect immune system',
        choice1: 'Mint',
        choice2: 'Rosemary',
        choice3: 'Thyme',
        choice4: 'Basil',
        answer: 2,
    }
]

// a global unchanging variables to store points and maximum number of questions
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 9;

//  Function that starts the quiz and adds next remaining questions
function startQuiz() {
    // Set the counter and score to start with 0
    questionCount = 0;
    score = 0;
    // Using spread method to pick up each item and create an array  
    availableQuestions = [...questions];
    // Calling function to get next question
    getNewQuestion();
};

// Getting new questions through function
function getNewQuestion() {
    // If there is no more questions or the counter is bigger than maximum of questions - which is impossible
    if (availableQuestions.length == 0 || questionCount > MAX_QUESTIONS) {
        // A new variable stores score added through questions loop
        localStorage.setItem('mostRecentScore', score);
        // The final score stored is saved in the save-score.html window storage
        return window.location.assign('/save-score.html');
    }

    // Adding next question 
    questionCount++;
    // The display of Question number of total number of questions
    progressText.innerText = `Question ${questionCount} of ${MAX_QUESTIONS}`;
    // Style of progress bar to show how close to finishing the quiz 
    progressBarFull.style.width = `${(questionCount/MAX_QUESTIONS) * 100}%`;

    // Using random method from Math module to multiply with 
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        let correctAnswer = "";

        if (classToApply === 'correct') {
            addTheScore(SCORE_POINTS);
        } else {
            correctAnswer = document.querySelector(`.choice-text[data-number="${currentQuestion.answer}"]`);
            correctAnswer.parentElement.classList.add('correct');
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            if (classToApply == 'incorrect') {
                correctAnswer.parentElement.classList.remove('correct')
            };
            getNewQuestion();

        }, 1700);
    })
})

addTheScore = num => {
    score += num;
    scoreText.innerText = score;
}

startQuiz();