// Global unchanging variables targeted by query selector 

const nickname = document.querySelector('#nickname');
const storeScoreBtn = document.querySelector('#store-score-btn');
const finalStore = document.querySelector('#final-store');
const lastScore = localStorage.getItem('lastScore');

// Using JSON method to create an array of stored highscores and if there was none start an array 
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// Declare a variable to hold summed up highscores
const HIGHSCORES = 8;
// Store last stored score in a variable that displays it using a method
finalStore.innerText = lastScore;

// Listening for a space where nickname is entered and if empty, user is unable to store the score
nickname.addEventListener('keyup', () => {
    storeScoreBtn.disabled = !nickname.value;
});

/**
 * Prevent the browser from executing the default action of the event in saving highscore
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
        highScores.splice(8);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('https://totalnomartina.github.io/save-score.js');
}
