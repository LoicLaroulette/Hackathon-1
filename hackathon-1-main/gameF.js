let question = document.getElementById('question');
let choices = Array.from(document.getElementsByClassName("choice-text")); //make it become an array
let questionCounterText = document.getElementById('questionCounter')
let scoreText = document.getElementById('score')
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let currentQuestion = {};
let acceptAnswer = false;
let score = 0;
var time = 0;
let questionCounter = 0;  //number of questions done
let availableQuestions=[];

//questions
let questions = [
{
		question: "How many hearts does an octopus have?",
		choice1: "2",
		choice2: "4",
		choice3: "3",
		choice4: "1",
		answer: 3
},
{		question: "How do horses and cows sleep?",
		choice1: "Sideways",
		choice2: "Standing",
		choice3: "On their knees",
		choice4: "On their bellies",
		answer: 2
	},
{		question: "Which animal cannot blink?",
		choice1: "Snake",
		choice2: "Pigs",
		choice3: "Spiders",
		choice4: "Crocodile",
		answer: 1
},
{		question: "Who will win the Hackathon?",
		choice1: "Advait & Shaishta",
		choice2: "Varshana & Loic",
		choice3: "Oceanne & Shahzad",
		choice4: "Yasaar",
		answer: 2
},
{		question: "Human teeth are as strong as ",
		choice1: "Turtle Shell",
		choice2: "Human bones",
		choice3: "Lion teeth",
		choice4: "Shark teeth",
		answer: 4
},
{		question: "What is the capital of New Zealand?",
		choice1: "Wellington",
		choice2: "Washington",
		choice3: "Smellinton",
		choice4: "Illton",
		answer: 1
},
{		question: "What was the old name for a Snickers bar before it changed in 1990?",
		choice1: "Dat Bar",
		choice2: "Triathlon",
		choice3: "Marathon",
		choice4: "Sneaky Bar",
		answer: 3
},
{		question: "What is the smallest planet in our solar system?", //8
		choice1: "Idk, i'm dumb",
		choice2: "Mercury",
		choice3: "Uranus...",
		choice4: "Pluto",
		answer: 2
},
{		question: "What element is denoted by the chemical symbol Sn in the periodic table?", //9
		choice1: "No elements",
		choice2: "Sincrium",
		choice3: "Sin",
		choice4: "Tin",
		answer: 4
},
{		question: "What is the name of Dua Lipa’s 2020 album release?", //10
		choice1: "Midnight Memories",
		choice2: "Lovesick",
		choice3: "Future Nostalgia",
		choice4: "I don't care",
		answer: 3
},
{		question: "What was Australia's former name?", //11
		choice1: "New Amsterdam",
		choice2: "Andorra",
		choice3: "New Holland",
		choice4: "Bosnia",
		answer: 3
},
{		question: "What is the national animal of Scotland?", //11
		choice1: "Unicorn",
		choice2: "Turtle",
		choice3: "Rabbit",
		choice4: "Raven",
		answer: 1
},
{       question: "What is the best-selling musical instrument in the world?", //11
		choice1: "Accordion",
		choice2: "Harmonica",
		choice3: "The voice",
		choice4: "Drums",
		answer: 2
},
];


//constants
let CORRECT_BONUS = 10; //how many scores you get
let MAX_QUESTION= 10;  //how many questions there are

let startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions= [...questions];
	console.log(availableQuestions)
	getNewQuestion()
	startTimer(); //calling startTimer function
    // startTimerLine(); //calling startTimerLine function

};
   

let getNewQuestion = () => {
if(availableQuestions.length===0 || questionCounter >= MAX_QUESTION){  //when no more question left or are used up, redirect to end of game to insert highscore
	localStorage.setItem("mostRecentScore",score);
		// return window.location.assign('end.html')
	localStorage.setItem("totalTimeTaken", time);
	return window.location.assign('end.html')
}

	questionCounter++;
	questionCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`


	let questionIndex=Math.floor(Math.random()* availableQuestions.length);  //randomly chooses the questions
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach(choice => {
		let number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice'+ number];

	})

	availableQuestions.splice(questionIndex, 1); //removes question already answered from the quiz when we will proceed to the next one

	acceptAnswer= true;
};


choices.forEach(choice => {
	choice.addEventListener('click', e =>{
		if(!acceptAnswer) return;

		acceptAnswer=false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];   //changes question after having clicked on an answer

		const classToApply = selectedAnswer == currentQuestion.answer ? ("correct") : ("incorrect");	
		
		if(classToApply === 'correct'){
			incrementScore(CORRECT_BONUS);
		}
		selectedChoice.parentElement.classList.add(classToApply);

		 setTimeout(() => {
		selectedChoice.parentElement.classList.remove(classToApply);
		getNewQuestion()
		}, 1000);
			
	})
})

function startTimer(){
    setInterval(timer, 1000);
}
function timer(){
	timeCount.textContent = time.toString(); //changing the value of timeCount with time value
	time++; //increment the time value
}

let incrementScore = num => {
	score += num;
	scoreText.innerText = score;
}

startGame();