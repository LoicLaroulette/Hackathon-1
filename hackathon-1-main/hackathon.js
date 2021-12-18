var music = document.getElementById("myAudio"); 
var bleep = new Audio();
bleep.src = "tink.wav"

function playAudio() { 
  music.play();

} 

function pauseAudio() { 
  music.pause(); 
}

// function deleteData() {
//   localStorage.clear()
// }
//  deleteData()