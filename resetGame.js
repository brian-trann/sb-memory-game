// Trying to make a resetGame function where I do not reload the page

// I could not get this function to work correctly. The first time resetGame runs, everything is ok
// the second time through, it seems like createDivsForColors is running twice.
// may come back later.

function resetGame() {
	document.querySelector('.reset-game').classList.toggle('is-hidden');
	matchedCount = 0;
	firstCard = null;
	secondCard = null;
	let flipped = document.querySelectorAll('.flip');
	for (let i of flipped) {
		// console.log(i);
		i.classList.remove('.flip');
		i.remove();
		// console.log(i);
	}
	shuffle(COLORS);
	createDivsForColors(shuffledColors);
}
