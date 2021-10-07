
//Declaring a variable that targets id of high-scores-list
const highScoresList = document.querySelector('#high-scores-list');
/*Declaring a variable of getting the items that were dynamically created 
and using JSON function we add every new score into an array, or we create a new one to do same */
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

/* Reaching out to inner text of the HTML and adding a dictionary that was put inside a list 
element with relevant class which targets connecting name of the user played and score achieved,
and ultimately using a method to join together the two variables */
highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="highscore">${score.name} - ${score.score}</li>`
    }).join('')