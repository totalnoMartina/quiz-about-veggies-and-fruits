const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#save-score-btn');
const finalScore = document.querySelector('#final-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGHSCORES = 8;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort((a, b) => {
            return b.score - a.score;
        }),

        highScores.splice(9);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.reload('/');
}