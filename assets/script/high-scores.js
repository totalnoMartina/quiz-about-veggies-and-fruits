//Declare a variable that targets id of high-scores-list
let highScoresList = document.getElementById('high-scores-list');

/*Declare a variable of getting the items that were dynamically created 
and using JSON function we add every new score into an array, or we create a new one to do same */
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

/* Reach out to inner text of the HTML and add a dictionary that was put inside a list 
element with relevant class which targets connecting name of the user played and score achieved,
and ultimately using a method to join together the two variables and display it through html */
highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="highscore">${score.name} - ${score.score}</li>`
    }).join('')

// Declare a variable that targets the reset button id
const resetScore = document.querySelector('#reset');

/**
 * A function to clear all the highscores in the highscores list
 */
function reset() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// Adding a function to be called to reset the hghscores after clicked
resetScore.addEventListener('click', reset);
