/*
This is my first web app, please don't swear too hard

Made by Ashur, 2018 (like anyone gives a shit)

Hope u'll enjoy
*/

var scores, roundScore, activePlayer, dice, diceResult, rollCount, winningScore;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
diceResult = [];
rollCount= 0;



// document.getElementById('winnerScore').style.display = 'none';

document.querySelector('.dice-img_0').style.display = 'none';
document.querySelector('.dice-img_1').style.display = 'none';
document.querySelector('#current_score_0').textContent = 0;
document.querySelector('#current_score_1').textContent = 0;
document.querySelector('#total_score_0').textContent = 0;
document.querySelector('#total_score_1').textContent = 0;
document.getElementById('roll').style.visibility = 'hidden';
document.getElementById('newGame').style.visibility = 'hidden';
document.getElementById('wrap').style.display = 'none';

// set winning score 

document.getElementById('play').addEventListener('click', function() {
	winningScore = document.querySelector('input').value;
	document.getElementById('winnerScore').style.display = 'none';
	document.getElementById('roll').style.visibility = 'visible';
	document.getElementById('newGame').style.visibility = 'visible';
	document.getElementById('wrap').style.display = 'flex';

});

/*winningScore = prompt('Set the winning score! (please only numbers or u\'ll break the game' );*/

// the function that switches the player

var switchPlayer = function(){
	document.getElementById('player_' + activePlayer).classList.remove('active');
	document.getElementById('player_' + activePlayer + '_ID').classList.remove('active');
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.getElementById('player_' + activePlayer).classList.add('active');
	document.getElementById('player_' + activePlayer + '_ID').classList.add('active');
	rollCount = 0;
	diceResult = [];
}

if (roundScore == 0) {
	document.getElementById('hold').style.visibility = 'hidden';
};

// roll function
var roll = function() {

	// random number
	dice = [];

	dice[0] = Math.floor(Math.random() * 6) + 1;
	dice[1] = Math.floor(Math.random() * 6) + 1;


	// update the dice
	var diceDOM = [];
	diceDOM[0] = document.querySelector('.dice-img_0');
	diceDOM[1] = document.querySelector('.dice-img_1');
	diceDOM[0].style.display = 'block';
	diceDOM[1].style.display = 'block';
	diceDOM[0].src = 'img/Dice-' + dice[0] + '.png';
	diceDOM[1].src = 'img/Dice-' + dice[1] + '.png';

	if (dice[0] == 6 && dice[1] == 6) {
		roundScore = 0;
		document.getElementById('current_score_' + activePlayer).textContent = roundScore;
		document.getElementById('total_score_' + activePlayer).textContent = roundScore;
		scores[activePlayer] = roundScore;
		document.getElementById('hold').style.visibility = 'hidden';
		switchPlayer();
	} else if (dice[0] != 1 && dice[1] != 1)  {
		document.getElementById('hold').style.visibility = 'visible';
		roundScore += dice[0] + dice[1];
		document.getElementById('current_score_' + activePlayer).textContent = roundScore;
	} else {
		document.getElementById('hold').style.visibility = 'hidden';
		// set current score to 0
		roundScore = 0;
		document.getElementById('current_score_' + activePlayer).textContent = roundScore;
		// switch the player
		switchPlayer();
	}


	// set total score and current score to 0 if dice rolls 6 twice in a row
	diceResult[rollCount] = dice;
	if (diceResult[rollCount] == 6 & diceResult[rollCount - 1] == 6) {
		console.log('it works');
		roundScore = 0;
		document.getElementById('current_score_' + activePlayer).textContent = roundScore;
		document.getElementById('total_score_' + activePlayer).textContent = roundScore;
		scores[activePlayer] = roundScore;
		document.getElementById('hold').style.visibility = 'hidden';
		switchPlayer();
	};
	rollCount++;
};

// ROLL BUTTON

document.getElementById('roll').addEventListener('click', roll);

// HOLD BUTTON

document.getElementById('hold').addEventListener('click', function() {

	document.getElementById('hold').style.visibility = 'hidden';

	// update total score
	var diceDOM = [];
	diceDOM[0] = document.querySelector('.dice-img_0');
	diceDOM[1] = document.querySelector('.dice-img_1');
	diceDOM[0].style.display = 'none';
	diceDOM[1].style.display = 'none';
	scores[activePlayer] += roundScore;
	document.getElementById('total_score_' + activePlayer).textContent = scores[activePlayer];

	// winner statement
	if (scores[activePlayer] >= winningScore) {
		document.getElementById('player_' + activePlayer + '_ID').textContent = 'WINNER!';
		document.querySelector('#roll').style.display = 'none';
		document.querySelector('#hold').style.display = 'none';
	} else {
		// set to zero current score & roundscore
		document.getElementById('current_score_' + activePlayer).textContent = 0;
		roundScore = 0;

		// update the player
		switchPlayer();

	}

})

// NEW GAME BUTTON

document.getElementById('newGame').addEventListener('click', function() {
	window.location.reload(false);	
});



