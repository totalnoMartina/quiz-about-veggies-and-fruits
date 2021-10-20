/* jshint esversion: 8 */

//  localStorage.removeItem('questions-nums');
const highScoreBtn = document.getElementById('highscores-btn');

        if(localStorage.getItem('highScores')) {
            highScoreBtn.style.display = 'block';
        } else {
            highScoreBtn.style.display = 'none';
        }

const questNumberChoice = document.getElementById('questions-num'); // targeting input value to get choice of questions possibly
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', checkNumQuestions);

function checkNumQuestions() {
    if(parseInt(questNumberChoice.value) >= 7 && parseInt(questNumberChoice.value) <= 19) {
        
        window.location.href = 'main-quiz.html';
        
    } else {
        document.getElementById('warning').innerText = 'Please, choose between 7 - 19 questions';
    }
}
