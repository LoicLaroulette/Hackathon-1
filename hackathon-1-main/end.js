let username = document.getElementById('username');
let saveScoreBtn = document.getElementById('saveScoreBtn')
let finalScore = document.getElementById('finalScore');
var totalTime= document.getElementById('totalTime')
let mostRecentScore = localStorage.getItem('mostRecentScore');
let totalTimeTaken = localStorage.getItem('totalTimeTaken');
console.log(mostRecentScore)

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var totalTimeRec = JSON.parse(localStorage.getItem("totalTime"))||[]
let MAX_HIGH_SCORES = 5
console.log(highScores)
console.log(totalTimeRec)

finalScore.innerText = mostRecentScore;
totalTime.innerText= totalTimeTaken;

username.addEventListener('keyup', () => {
	saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()
   

	let score ={
		score: mostRecentScore,
		name: username.value,
		time: totalTimeTaken,
	}
	highScores.push(score);
	totalTimeRec.push(score);
	highScores.sort( (a,b) => b.score - a.score )//if score b > score a, put score b higher than score a
	highScores.splice(5);

	localStorage.setItem("highScores", JSON.stringify(highScores))  //permanently saves highscores
localStorage.setItem("totalTime", JSON.stringify(totalTimeRec))  //permanently saves total
window.location.assign("Hackathon.html");
console.log(highScores)    
// console.log(score.time)

}

saveHighScore()