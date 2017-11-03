var Word = require('./word.js');
var prompt = require('prompt');

console.log("Lets play Superhero Hangman!");
console.log("Guess a letter of the word or name");
console.log("Goodluck!");

prompt.start();



game = {
 	wordBank: ['superman', 'batman', 'flash', 'spiderman', 'clarkkent', 'ironman', 'thor'],
  guessesRemaining: 10,
 	wordsWon: 0,
 	currentWrd: null,

 	startGame: function (wrd) {
 		this.resetGuesses();
 		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		this.currentWrd.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var mars = this;
 		prompt.get(['guessLetter'], function(err, result){
 			console.log("You guessed: " + result.guessLetter);
 			var manyGuessed = mars.currentWrd.checkLetter(result.guessLetter);

 			if(manyGuessed == 0) {
 				console.log("WRONG");
 				mars.guessesRemaining--;

 			} else {
 				console.log("CORRECT");
 					if(mars.currentWrd.findWord()){
 						console.log("You won!");

 						return;
 					}
 			}

 			console.log("Guesses remaining: " + mars.guessesRemaining);

 			if((mars.guessesRemaining > 0) && (mars.currentWrd.found == false)){
 				mars.promptUser();
 			}
 			else if(mars.guessesRemaining == 0){
 				console.log("Game over. Correct Word ", mars.currentWrd.target);
 			} else {
 				console.log(mars.currentWrd.wordRender());
 			}
 		});

 	}


};

game.startGame();
