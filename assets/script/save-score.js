// Global unchanging variables

// A variable to store users nickname / name
const nickname = document.querySelector('#nickname');
// A variable to store a button that stores the score
const storeScoreBtn = document.querySelector('#store-score-btn');
// A variable to store final score stored 
const finalStore = document.querySelector('#final-store');
// Declare a variable of last score and getting it from local storage
const lastScore = localStorage.getItem('lastScore');

// Using JSON method to add a string which was gotten form to stored highscores and if there was none start an array 
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// Declare a variable to hold summed up highscores
const TOP_HIGHSCORES = 8;
// Store last stored score in a variable that displays it using a method
finalStore.innerText = lastScore;

/** Listening for a nickname value, and if nothing is entered, user is 
 * unable to store the score
 */
nickname.addEventListener('keyup', () => {
    storeScoreBtn.disabled = !nickname.value;
});

/**
 * Prevent the browser from executing the default action of the event in 
 * saving highscore function
 */
saveHighScore = e => {
    e.preventDefault();
    // Declare a variable to store a dictionary of the last score summed up and nickname entered
    const score = {
        score: lastScore,
        name: nickname.value
    }
    // Add last score to highscores list
    highScores.push(score);
    // Sort highscores list +++++
    highScores.sort((a, b) => {
            return b.score - a.score;
        }),
        // Spliting the highscores list into 8 pieces to remember
        highScores.splice(7);
    // Calling strings of highscores to be stored in an array in local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // Use a location.assign() method and placing an url to be storing the highscores
    window.location.assign('https://totalnomartina.github.io/quiz-about-veggies-and-fruits/index.html');
}

const resetScore = document.querySelector('#reset');

function reset(score) {
    highScoresList.reload(score);
}

resetScore.addEventListener('click', reset);