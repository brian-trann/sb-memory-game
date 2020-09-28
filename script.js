const gameContainer = document.getElementById('game');
let firstCard = null;
let secondCard = null;
let locked = false;
let matchedCount = 0;
let clickCount = 0;
let bestScore = localStorage.getItem('best-score') || Infinity;
// const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

let multiplier = 5;

// generate random hexcode as a sting. randomColor() // sometimes breaks due to invalid hex code
// const randomColor = () => {
// 	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// };

//generate random rgba as a string
const randomColor = () => {
	let o = Math.round,
		r = Math.random,
		s = 255;
	return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
};

let randColorArray = [];

for (let count = 0; count < multiplier; count++) {
	color = randomColor();
	randColorArray.push(color, color);
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

// let shuffledColors = shuffle(COLORS);
let shuffledColors = shuffle(randColorArray);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	// console.log('you just clicked', event.target);
	if (locked) {
		return;
	}
	if (event.target.classList.contains('flip')) {
		return;
	}

	let currentCard = event.target;
	currentCard.style.backgroundColor = currentCard.classList[0];
	// if firstCard or secondCard is not null...
	if (!firstCard || !secondCard) {
		currentCard.classList.add('flip');
		firstCard = firstCard || currentCard;
		// if firstCard is truthy, secondCard is null, otherwise currentCard
		secondCard = currentCard === firstCard ? null : currentCard;
	}
	if (firstCard && secondCard) {
		locked = true;

		if (firstCard.className === secondCard.className) {
			matchedCount += 2;
			firstCard.removeEventListener('click', handleCardClick);
			secondCard.removeEventListener('click', handleCardClick);
			firstCard = null;
			secondCard = null;
			locked = false;
		} else {
			setTimeout(function() {
				firstCard.style.backgroundColor = '';
				secondCard.style.backgroundColor = '';
				firstCard.classList.remove('flip');
				secondCard.classList.remove('flip');
				firstCard = null;
				secondCard = null;
				locked = false;
			}, 1000);
		}
	}

	if (matchedCount === COLORS.length) {
		setTimeout(function() {
			document.querySelector('.reset-game').classList.remove('is-hidden');
			const yourScore = document.querySelector('.reset-game p');
			if (clickCount < bestScore) {
				localStorage.setItem('best-score', clickCount);
				yourScore.innerText = `Your Score: ${clickCount} -- New Best Score!`;
				//
			} else {
				yourScore.innerText = `Your Score: ${clickCount}`;
			}

			document.querySelector('.reset').addEventListener('click', function() {
				// resetGame()
				location.reload();
			});
		}, 400);
	}
	clickCount++;
}
const tutorial = document.querySelector('.tutorial');
if (bestScore === Infinity) {
	tutorial.firstElementChild.nextElementSibling.innerText = `Best Score: N/A`;
} else {
	tutorial.firstElementChild.nextElementSibling.innerText = `Best Score: ${bestScore}`;
}
tutorial.addEventListener('click', function(event) {
	// console.log(event.target);
	if (event.target.classList.contains('play')) {
		document.querySelector('.tutorial').classList.add('is-hidden');

		createDivsForColors(shuffledColors);
	}
});

// Trying to make a resetGame function where I do not reload the page

// I could not get this function to work correctly. The first time resetGame runs, everything is ok
// the second time through, it seems like createDivsForColors is running twice.
// may come back later.

// function resetGame() {
// 	document.querySelector('.reset-game').classList.toggle('is-hidden');
// 	matchedCount = 0;
// 	firstCard = null;
// 	secondCard = null;
// 	let flipped = document.querySelectorAll('.flip');
// 	for (let i of flipped) {
// 		// console.log(i);
// 		i.classList.remove('.flip');
// 		i.remove();
// 		// console.log(i);
// 	}
// 	shuffle(COLORS);
// 	createDivsForColors(shuffledColors);
// }
