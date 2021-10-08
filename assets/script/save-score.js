// Global unchanging variables targeted by query selector 

const nickname = document.querySelector('#nickname');
const storeScoreBtn = document.querySelector('#store-score-btn');
const finalStore = document.querySelector('#final-store');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGHSCORES = 8;

finalStore.innerText = mostRecentScore;

nickname.addEventListener('keyup', () => {
    storeScoreBtn.disabled = !nickname.value;
});
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: nickname.value
    }

    highScores.push(score);

    highScores.sort((a, b) => {
            return b.score - a.score;
        }),

        highScores.splice(8);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
}