const highScoresList = document.querySelector('#high-scores-list');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="highscore">${score.name} - ${score.score}</li>`
    }).join('')