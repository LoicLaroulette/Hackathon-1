let highScoresList= document.getElementById('highScoresList');
let timeTakenList= document.getElementById('timeTakenList');
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores)
let timetaken = JSON.parse(localStorage.getItem('totalTime')) || [];
console.log(timetaken)

console.log(highScores)
// highScoresList.innerHTML = highScores[0]

timeTakenList.innerHTML = highScores
.map( score =>{  //takes the incoming array 'highscores' and converts the items to a new array
	return `<li class="high-score"><h2>${score.name}- ${score.score} in ${score.time} sec.</h2></li>`;
})
.join("");

//timer-how(html,js,css)    