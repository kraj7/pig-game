'use strict';

// for id selector use #
// for class selector use .

//selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let currentscore, activePlayer, scores, playing;
// functions
const init = function() {

  currentscore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.remove('hidden');
}
init();
const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = (activePlayer === 1) ? 0 : 1;
  currentscore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//rolling dice functionality
btnRoll.addEventListener('click', function() {
  if (playing) {
    // 1. generatenumber
    const generatenumber = Math.trunc(Math.random() * 6) + 1;
    console.log(generatenumber);

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${generatenumber}.png`;

    // 3. check for rolled 1 if true (pass on to the next player)
    if (generatenumber !== 1) {
      // add generatenumber to the current score
      currentscore = currentscore + generatenumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentscore;
    } else {
      // switch to the next player
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = (activePlayer === 1) ? 0 : 1;
      // currentscore = 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');

      // if this class is not there then toggle will add it
      // if this active--player is there as class then it will remove it
    }
  }
});

btnHold.addEventListener('click', function() {
  if (playing) {
    // 1. add current score to the active player
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. check if player score > 100
    if (scores[activePlayer] >= 100) {
      // 3. if yess then declare the winner
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else switchPlayer(); // 4. else switch the player
  }
});


btnNew.addEventListener('click', init);
