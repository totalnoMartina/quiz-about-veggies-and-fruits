// Global variables 

const question = document.querySelector('#question'); // A variable that stores a question targeted based on id
const options = Array.from(document.querySelectorAll('.option-text')); // Creating an array using class name and storing it in a variable choices found by class name
const progressInfo = document.querySelector('#progress-info'); // A variable that targets progress area
const scoreInfo = document.querySelector('#score'); // A variable that targets score based on id 
const progressFull = document.querySelector('#progress-full'); // A variable that shows when quiz is on last question the progress bar is full
// const questNumberChoice = document.getElementsByTagName('[input=number');

// An empty dictionary for questions and answers connected to the question
let chooseQuestion = {};
// Declaring a constant variable that stores the true value of answers being accepted
let asking = true;
// A global variable that stores a starting value of a score
let score = 0;
// A global variable that stores looping through questions
let anotherQuestion = '';
// An empty array that stores values of leftover questions through a function getNewQuestion()
let remainingQs = [];

// An array of questions and a dictionary of question, choices and correct answers
let questions = [{
        question: 'Which one of these is weight-loss-friendly, helps boost immune system and is in fact a berry?',
        option1: 'Cherry',
        option2: 'Strawberry',
        option3: 'Pumpkin',
        option4: 'Raspberry',
        answer: 3,
    },
    {
        question: 'This vegetable is of a Sunflower family and number one in antioxidants amongst all vegetables, there is also a Food and Wine festival in California dedicated bringing together lovers of this specific vegetable, which one is it?',
        option1: 'Salsify',
        option2: 'Endive',
        option3: 'Artichoke',
        option4: 'Lettuce',
        answer: 3,
    },
    {
        question: 'This fruit is discovered in 500 BC and from Aztecs native language Nahuatl translated as \'testicles\', it is abundant in nutrients and a low-carb food counting only 160 calories per 100 grams serving. Which is it?',
        option1: 'Nectarine',
        option2: 'Avocado',
        option3: 'Aubergine',
        option4: 'Grape',
        answer: 2,
    },
    {
        question: 'Which one of these is a complete protein source - meaning it contains all the essential amino acids that your body can\'t make and is in fact a nut?',
        option1: 'Hemp seed',
        option2: 'Pumpkin seed',
        option3: 'Chia seed',
        option4: 'Butternutsquash seed',
        answer: 1,
    },
    {
        question: 'Which vegetable contains more protein per calorie than animal based protein?',
        option1: 'Carrot',
        option2: 'Spinach',
        option3: 'Leek',
        option4: 'Broccolli',
        answer: 4,
    },
    {
        question: 'Which one of these when added to your diet, helps boost heart health, reduces inflammation and has antibacterial properties in our gut?',
        option1: 'Sesame oil',
        option2: 'Vegetable oil',
        option3: 'Olive oil',
        option4: 'Sunflower oil',
        answer: 3,
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
        question: 'Which fruit is of Rose family and has better effect on your energy level than coffee?',
        option1: 'Apple',
        option2: 'Orange',
        option3: 'Grapes',
        option4: 'Nectarine',
        answer: 1,
    },
    {
        question: 'Which nut butter helps in type 2 diabetes prevention, aids weight-loss and glows in dark after exposed to intense light?',
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
        question: 'This berry, native to North America, is ranked number one antioxidants amongst 40 varieties of fruit and is known to mankind over 13 000 years. Which is it?',
        option1: 'Huckleberry',
        option2: 'Blueberry',
        option3: 'Farkleberry',
        option4: 'Cranberry',
        answer: 2,
    },
    {
        question: 'Which one of these is considered "nutraceutical", meaning it can prevent and treat disease?',
        option1: 'Grapefruit',
        option2: 'Bergamot',
        option3: 'Mandarin',
        option4: 'Lemon',
        answer: 1,
    },
    {
        question: 'Which one of these herbs boosts memory, heals cancer, relieves pain and protects immune system?',
        option1: 'Mint',
        option2: 'Rosemary',
        option3: 'Thyme',
        option4: 'Basil',
        answer: 2,
    },
    {
        question: 'Which one of these is a flower turned inside-out, and has more fiber than prunes and more potassium than bananas?',
        option1: 'Grape',
        option2: 'Apricot',
        option3: 'Date',
        option4: 'Fig',
        answer: 4,
    },
    {
        question: 'Which one of these spices supports liver detoxification, is proven to reduce depression symptoms and even help reverse diabetes?',
        option1: 'Cardamom',
        option2: 'Turmeric',
        option3: 'Ginger',
        option4: 'Cinnamon',
        answer: 2,
    },
    {
        question: 'This one is a rare natural source of vitamin D, packed with minerals like selenium, potassium, copper, iron and phosphorus, even helps stop your skin and brain from aging, which is it?',
        option1: 'Mushroom',
        option2: 'Soy Bean',
        option3: 'Rice',
        option4: 'Almond',
        answer: 1,
    },
    {
        question: 'Worshipped by ancient Egyptians, this vegetable was used for paying rent, and for its anti-bacterial properties - it was also used for treating wounds, which one is it?',
        option1: 'Pepper',
        option2: 'Tomato',
        option3: 'Courgette',
        option4: 'Onion',
        answer: 4,
    },
    {
        question: 'Coming from a \'pea family\', this vegetable helps boost immune system, prevents anemia and improves sleep, which is it?',
        option1: 'Chickpea',
        option2: 'Black Bean',
        option3: 'Fava Bean',
        option4: 'Lentil',
        answer: 3,
    }
]

// Unchanging variables to store points and maximum number of questions
const SCORE_POINTS = 100;
let TOP_QUESTIONS = 19;

//** Function that starts the quiz and adds next remaining questions */ 
function startQuiz() {
    // Set the counter and score to start with 0
    anotherQuestion = 0;
    score = 0;


    // Use of spread method to pick up each remaining item and create an array 
    remainingQs = [...questions];
    // Calling a function to get the next question
    getNewQuestion();
};

//** Creating a function that takes available question as next question */
function getNewQuestion() {
    // If there is no more questions left or the counter is bigger than maximum of questions
    if (remainingQs.length == 0 || anotherQuestion > TOP_QUESTIONS) {
        // A new variable stores score added through questions loop
        localStorage.setItem('lastScore', score);
        // The final score stored is saved in the save-score.html window storage
        return window.location.href = 'https://totalnomartina.github.io/quiz-about-veggies-and-fruits/save-score.html';
    }

    // Adding next question using shorthand expression
    anotherQuestion++;
    // The display of next question number of total number of questions
    progressInfo.innerText = `Question ${anotherQuestion} of ${TOP_QUESTIONS}`;
    // Dynamically styling progress bar to show how close to finishing the quiz, fiiling up with color more with each new question 
    progressFull.style.width = `${(anotherQuestion/TOP_QUESTIONS) * 100}%`;

    // Using random method from Math module to get random number of index of the question, for questions to be scattered and harder to remember
    const questionsIndex = Math.floor(Math.random() * remainingQs.length);
    // Setting remaining question to an index of the available question
    chooseQuestion = remainingQs[questionsIndex];
    // Display the text of the string in the question variable !! Ask Tim ***** Inspect says that question is not a function - true
    question.innerText = chooseQuestion.question;

    // Looping through options based on value data of number next to it
    options.forEach(option => {
        // Set number variable to dataset value of option variable based on option-number
        const number = option.dataset['number'];
        // Set text of the option to the value of current number of the question
        option.innerText = chooseQuestion['option' + number];
    });
    /* A new array of questions that are left to be answered is created and first 
    indexed question is used */
    remainingQs.splice(questionsIndex, 1);
    // as long as there is another question to ask, keep 
    asking = true;
};
/**Looping through options using arrow function and for each option clicked and 
 * listened to, function is checking if there are more answers to click to
 */
options.forEach(option => {
    option.addEventListener('click', e => {
        // If there is no more answers then function is stopped with nothing else to return
        if (!asking) return;
        // Declare variable to false since there is no more questions left to loop through 
        asking = false;
        // Declare targeted event as selected option 
        const selectedOption = e.target;
        /* Declare chosen answer according to property of dataset targeting the number of the 
        option selected */
        const selectedAnswer = selectedOption.dataset['number'];
        /* Declare variable specific to this block scope that takes the class value 
         of an answer and in ternary expression a condition of correct or incorrect is calling
        the class name */
        let classToApply = selectedAnswer == chooseQuestion.answer ? 'correct' : 'incorrect';
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
            correctAnswer = document.querySelector(`.option-text[data-number="${chooseQuestion.answer}"]`);
            /* correctAnswer is a child element of a list so we are calling the parent class to 
            add all correct answers */
            correctAnswer.parentElement.classList.add('correct');
        }
        // selectedOption calls a class to be applied as argument and then is added to a list after a question(parent element) is answered(child element)
        selectedOption.parentElement.classList.add(classToApply);
        /**
         * Creating an arrow function to set how long will it take until the questions switches 
         * to next one
         */
        setTimeout(() => {
            // Remove the option after selected option is clicked
            selectedOption.parentElement.classList.remove(classToApply);
            // Conditional to value of class name of incorrect
            if (classToApply == 'incorrect') {
                // Code that belongs to this part of a list class is removed
                correctAnswer.parentElement.classList.remove('correct');
            };
            // A function to call next Question is called
            getNewQuestion();
            // Duration of the wait to next question after one is answered
        }, 1500);
    });
});
/* Using arrow function to assign a num variable to be incremented by next score and write 
it into HTML */
addTheScore = num => {
    score += num;
    scoreInfo.innerText = score;
}

// Call a function to start the Quiz
startQuiz();