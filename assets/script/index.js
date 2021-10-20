/* jshint esversion: 8 */

// Remove value for user to always have empty field
localStorage.removeItem('questions-nums');
const highScoreBtn = document.getElementById('highscores-btn'); // A variable to hold a highscore button by id

        // Condition is checked based on record of highScores in local storage
        if(localStorage.getItem('highScores')) {
            // If found values, show button
            highScoreBtn.style.display = 'block';
        } else {
            // Otherwise, do not show button
            highScoreBtn.style.display = 'none';
        }

const questNumberChoice = document.getElementById('questions-num'); // Variable that holds input value that chooses questions
const startBtn = document.getElementById('start-btn');


startBtn.addEventListener('click', checkNumQuestions);


function checkNumQuestions() {
    if(parseInt(questNumberChoice.value) >= 7 && parseInt(questNumberChoice.value) <= 19) {
        sessionStorage.setItem("TOP_QUESTIONS", questNumberChoice.value);
        window.location.href = 'main-quiz.html';
        
    } else {
        document.getElementById('warning').innerText = 'Please, choose between 7 - 19 questions';
    }
}
