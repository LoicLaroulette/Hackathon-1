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
		question: "Who is Mulan?",
		choice1: "A princess",
		choice2: "A queen",
		choice3: "A warrior",
		choice4: "A witch",
		answer: 3
},
{		question: "What is Pascal?",
		choice1: "A frog",
		choice2: "A prince",
		choice3: "A chamaleon",
		choice4: "A gecko",
		answer: 3
},
{		question: "What pie did Snow White make?",
		choice1: "Gooseberry Pie",
		choice2: "Apple Pie",
		choice3: "Blueberry Pie",
		choice4: "Pumpkin Pie",
		answer: 1
},
{		question: "In Star Wars, The Millenium Falcon, can comfortably fit how many people in the cockpit?",
		choice1: "5",
		choice2: "4",
		choice3: "6",
		choice4: "8",
		answer: 2
},
{		question: "What is the name of Jasmine's tiger?",
		choice1: "Sher",
		choice2: "Khan",
		choice3: "Abu",
		choice4: "Rajah",
		answer: 4
},
{		question: "How old was Snow White in the story?",
		choice1: "16 years old",
		choice2: "14 years old",
		choice3: "18 years old",
		choice4: "15 years old",
		answer: 2
},
{		question: "Which classic Disney princess has a star on the Hollywood Walk of Fame?",
		choice1: "Snow White",
		choice2: "Cinderella",
		choice3: "Elsa",
		choice4: "Aurora",
		answer: 1
},
{		question: "In 1929, Mickey spoke his first words. What were they?", //8
		choice1: "Hot Dogs!",
		choice2: "Hello Folks!",
		choice3: "Wonderful Day!",
		choice4: "Ho Ho!",
		answer: 1
},
{		question: "What was the name of Maleficent’s pet raven?", //9
		choice1: "Lucifer",
		choice2: "Diablo",
		choice3: "Nemesis",
		choice4: "Coffin",
		answer: 2
},
{		question: "What is the name of the rat in Ratatouille", //10
		choice1: "Royce",
		choice2: "Bernard",
		choice3: "Rico",
		choice4: "Remy",
		answer: 4
},
{		question: "What Was The First Disney Movie To Win An Oscar?", //11
		choice1: "Cinderella",
		choice2: "Snow White",
		choice3: "Fantasia",
		choice4: "Hercules",
		answer: 2
},
{		question: "Which Animated Disney Film Almost Received An R Rating?", //12
		choice1: "The Black Cauldron",
		choice2: "Hocus Pocus",
		choice3: "The Watcher in the Woods",
		choice4: "The Nightmare Before Christmas",
		answer: 1
},
{		question: "How many daughters does King Triton have in The Little Mermaid?", //13
		choice1: "6",
		choice2: "8",
		choice3: "5",
		choice4: "7",
		answer: 4
},
{		question: "What school did the characters of High School Musical attend?", //14
		choice1: "Wildcats High School",
		choice2: "East High School",
		choice3: "Eastern High School",
		choice4: "West High School",
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