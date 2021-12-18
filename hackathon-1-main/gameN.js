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
		question: " What is the name of the fictional town where Stranger Things is set?",
		choice1: "Hawkins",
		choice2: "Hillburg",
		choice3: "Constan",
		choice4: "Belrins",
		answer: 1
},
{		question: "What is Jughead Jones’ real full name in Riverdale?",
		choice1: "Forsythe Halmilton Jones IV",
		choice2: "Forsh Pendinkton Jones III",
		choice3: "Forsythe Pendleton Jones III",
		choice4: "Birsh Hamilton Jones IV",
		answer: 3
},
{		question: "What is the name of the school in Sex Education?",
		choice1: "Riverdale High",
		choice2: "Moondale High",
		choice3: "Greendale High",
		choice4: "Moordale High",
		answer: 4
},
{		question: "What is the ethnicity of Paxton in Never Have I Ever?",
		choice1: "Thai",
		choice2: "Japanese",
		choice3: "Philipino",
		choice4: "Korean",
		answer: 2
},
{		question: "Season one of You sees Joe Goldberg meet Guinevere Beck at his place of work, but what job does he do?",
		choice1: "Bookstore manager",
		choice2: "Bookstore Receptionist",
		choice3: "Bookstore sweeper",
		choice4: "Bookstore owner",
		answer: 1
},
{		question: "Which character in Netflix series The Crown has been played by both Claire Foy and Olivia Colman?",
		choice1: " The Queen",
		choice2: "Prince Phillip",
		choice3: "King George",
		choice4: "Diana",
		answer: 1
},
{		question: " What is the name of Jesse's girlfriend who dies in Breaking Bad?",
		choice1: "Juliana",
		choice2: "Tesse",
		choice3: " Jane",
		choice4: "Aurora",
		answer: 3
},
{		question: "The Black Hood is a villain in which series?", //8
		choice1: "Sabrina The Teenage Witch",
		choice2: "Riverdale!",
		choice3: "La Casa De Papel",
		choice4: "After Life",
		answer: 2
},
{		question: "What was the name of Lucifer's twin brother?", //9
		choice1: "Micheal",
		choice2: "Amenadiel",
		choice3: "Apollo",
		choice4: "Muriel",
		answer: 1
},
{		question: "How many people did Joe kill in season two of You?", //10
		choice1: "3",
		choice2: "4",
		choice3: "5",
		choice4: "2",
		answer: 4
},
{		question: "When does Stranger Things Takes Place?", //11
		choice1: "80s",
		choice2: "70s",
		choice3: "60s",
		choice4: "mid 70s",
		answer: 3
},
{		question: "Who was Dr. Natalie 1st lover in Chicago Med?", //12
		choice1: "Jeff Manning",
		choice2: "Dr Jeff Clark",
		choice3: "Dr Halsted",
		choice4: "Jay Halsted",
		answer: 1
},
{		question: "What was the name Deanerys husband in GOT?", //13
		choice1: "Kal Rheagar",
		choice2: "Jon Snow",
		choice3: "Dothraki Targaryen",
		choice4: "Khal Drago",
		answer: 4
},
{		question: "Where did Terry once live when pursuing a college education in Brookly 99?", //14
		choice1: "Australia",
		choice2: "Sweden",
		choice3: "Alaska",
		choice4: "Japan",
		answer: 4
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