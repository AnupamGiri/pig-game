'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // Display the corrosponding dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1 : if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current scores to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if the total score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // Setting all the numbers to 0
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  // Setting the current player to 0
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // If a player have won then removing the player--winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Setting playing to true
  playing = true;

  // Showing all the numbers to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
});
