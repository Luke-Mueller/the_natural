// TODO DATA CONTROLLER

// Data variables
let
  deck = [
    {rank: 'ace', suit: 'spades', value: 11, id: 'AS'},
    {rank: '2', suit: 'spades', value: 2, id: '2S'},
    {rank: '3', suit: 'spades', value: 3, id: '3S'},
    {rank: '4', suit: 'spades', value: 4, id: '4S'},
    {rank: '5', suit: 'spades', value: 5, id: '5S'},
    {rank: '6', suit: 'spades', value: 6, id: '6S'},
    {rank: '7', suit: 'spades', value: 7, id: '7S'},
    {rank: '8', suit: 'spades', value: 8, id: '8S'},
    {rank: '9', suit: 'spades', value: 9, id: '9S'},
    {rank: '10', suit: 'spades', value: 10, id: '10S'},
    {rank: 'jack', suit: 'spades', value: 10, id: 'JS'},
    {rank: 'queen', suit: 'spades', value: 10, id: 'QS'},
    {rank: 'king', suit: 'spades', value: 10, id: 'KS'},
    {rank: 'ace', suit: 'hearts', value: 11, id: 'AH'},
    {rank: '2', suit: 'hearts', value: 2, id: '2H'},
    {rank: '3', suit: 'hearts', value: 3, id: '3H'},
    {rank: '4', suit: 'hearts', value: 4, id: '4H'},
    {rank: '5', suit: 'hearts', value: 5, id: '5H'},
    {rank: '6', suit: 'hearts', value: 6, id: '6H'},
    {rank: '7', suit: 'hearts', value: 7, id: '7H'},
    {rank: '8', suit: 'hearts', value: 8, id: '8H'},
    {rank: '9', suit: 'hearts', value: 9, id: '9H'},
    {rank: '10', suit: 'hearts', value: 10, id: '10H'},
    {rank: 'jack', suit: 'hearts', value: 10, id: 'JH'},
    {rank: 'queen', suit: 'hearts', value: 10, id: 'QH'},
    {rank: 'king', suit: 'hearts', value: 10, id: 'KH'},
    {rank: 'ace', suit: 'diamonds', value: 11, id: 'AD'},
    {rank: '2', suit: 'diamonds', value: 2, id: '2D'},
    {rank: '3', suit: 'diamonds', value: 3, id: '3D'},
    {rank: '4', suit: 'diamonds', value: 4, id: '4D'},
    {rank: '5', suit: 'diamonds', value: 5, id: '5D'},
    {rank: '6', suit: 'diamonds', value: 6, id: '6D'},
    {rank: '7', suit: 'diamonds', value: 7, id: '7D'},
    {rank: '8', suit: 'diamonds', value: 8, id: '8D'},
    {rank: '9', suit: 'diamonds', value: 9, id: '9D'},
    {rank: '10', suit: 'diamonds', value: 10, id: '10D'},
    {rank: 'jack', suit: 'diamonds', value: 10, id: 'JD'},
    {rank: 'queen', suit: 'diamonds', value: 10, id: 'QD'},
    {rank: 'king', suit: 'diamonds', value: 10, id: 'KD'},
    {rank: 'ace', suit: 'clubs', value: 11, id: 'AC'},
    {rank: '2', suit: 'clubs', value: 2, id: '2C'},
    {rank: '3', suit: 'clubs', value: 3, id: '3C'},
    {rank: '4', suit: 'clubs', value: 4, id: '4C'},
    {rank: '5', suit: 'clubs', value: 5, id: '5C'},
    {rank: '6', suit: 'clubs', value: 6, id: '6C'},
    {rank: '7', suit: 'clubs', value: 7, id: '7C'},
    {rank: '8', suit: 'clubs', value: 8, id: '8C'},
    {rank: '9', suit: 'clubs', value: 9, id: '9C'},
    {rank: '10', suit: 'clubs', value: 10, id: '10C'},
    {rank: 'jack', suit: 'clubs', value: 10, id: 'JC'},
    {rank: 'queen', suit: 'clubs', value: 10, id: 'QC'},
    {rank: 'king', suit: 'clubs', value: 10, id: 'KC'}
  ],
  playerHand1 = [],
  playerHand2 = [],
  playerHand3 = [],
  playerHand4 = [],
  dealerHand = [],
  wastePile = [],
  playerRoundTotal1,
  playerRoundTotal2,
  playerRoundTotal3,
  playerRoundTotal4,
  dealerRoundTotal;

const
  blackjack = 21.5,
  player1 = document.getElementById('player1'),
  player2 = document.getElementById('player2'),
  player3 = document.getElementById('player3'),
  player4 = document.getElementById('player4'),
  dealer = document.getElementById('dealer');

// Data functions
function dealCard() {
  // Get random card
  randomNum = Math.floor(Math.random() * deck.length)
  randomCard = deck[randomNum]

  // Remove the random card from the deck
  deck = deck.filter(card => card !== randomCard);

  // Return the random card
  return randomCard;
}

function clearHands() {
  // Variables and functions
  function clearHand(hand) {
    if(hand !== []) hand.forEach(card => wastePile.push(card))
  }

  // Push last round's hands into wastePile and empty hands
  if (playerHand1 !== []) clearHand(playerHand1), playerHand1 = [], playerRoundTotal1 = 0;
  if (playerHand2 !== []) clearHand(playerHand2), playerHand2 = [], playerRoundTotal2 = 0;
  if (playerHand3 !== []) clearHand(playerHand3), playerHand3 = [], playerRoundTotal3 = 0;
  if (playerHand4 !== []) clearHand(playerHand4), playerHand4 = [], playerRoundTotal4 = 0;
  if (dealerHand !== []) clearHand(dealerHand), dealerHand = [], dealerRoundTotal = 0;
}

function reShuffleDeck() {
  wastePile.forEach(card => {
    if (card.rank === 'ace') card.value = 11;
    deck.push(card);
  })
  wastePile = [];
}

function resetActiveClass() {
  player2.classList.remove('active');
  player3.classList.remove('active');
  player4.classList.remove('active');
  dealer.classList.remove('active');
  player1.classList.add('active');
}

function checkAceValue(roundTotal, hand) {
  while (roundTotal > 21.5 && hand.find(card => card.value === 11) !== undefined) {
    roundTotal = 0;
    hand.forEach(card => {
      if (card.value === 11) card.value = 1;
      roundTotal += card.value;
    })
  }
  return roundTotal;
}

function calcPlayerRoundTotal() {
  // Variables and functions
  let playerHand;
  let playerRoundTotal = 0;

  function calcRoundTotal () {
    playerHand.forEach(function(card) {
      playerRoundTotal += card.value;
    })
  }

  // Determine correct hand to calculate and calculate with aces rule
  if (player1.classList.contains('active')) {
    playerHand = playerHand1;
    calcRoundTotal();
    playerRoundTotal1 = checkAceValue(playerRoundTotal, playerHand);
    return playerRoundTotal1;
  } else if (player2.classList.contains('active')) {
    playerHand = playerHand2;
    calcRoundTotal();
    playerRoundTotal2 = checkAceValue(playerRoundTotal, playerHand);
    return playerRoundTotal2;
  } else if (player3.classList.contains('active')) {
    playerHand = playerHand3;
    calcRoundTotal();
    playerRoundTotal3 = checkAceValue(playerRoundTotal, playerHand);
    return playerRoundTotal3;
  } else if (player4.classList.contains('active')) {
    playerHand = playerHand4;
    calcRoundTotal();
    playerRoundTotal4 = checkAceValue(playerRoundTotal, playerHand);
    return playerRoundTotal4;
  }
}

function calcDealerRoundTotal() {
  dealerRoundTotal = 0;
  dealerHand.forEach(function(card) {
    dealerRoundTotal += card.value;
  });
  dealerRoundTotal = checkAceValue(dealerRoundTotal, dealerHand);
}

// TODO UI CONTROLLER

// UI functions
function displayCard(card, person) {
  const li = document.createElement('li');
  const left = document.getElementById(person).childElementCount * 8 + 'vw';
  if (person !== 'dealer') {
    li.innerHTML = `<img class="card" src="./images/${card.id}.png" alt=""/>`;
    li.style.marginLeft = left;
    document.getElementById(person).appendChild(li);
  } else {
    li.innerHTML = `<img class="card" src="./images/${card.id}.png" alt=""/>`;
    document.getElementById(person).appendChild(li);
  }
}

function clearDisplay() {
  while (player1.lastChild) {
    player1.removeChild(player1.lastChild);
  }
  while (player2.lastChild) {
    player2.removeChild(player2.lastChild);
  }
  while (player3.lastChild) {
    player3.removeChild(player3.lastChild);
  }
  while (player4.lastChild) {
    player4.removeChild(player4.lastChild);
  }
  while (dealer.lastChild) {
    dealer.removeChild(dealer.lastChild);
  }
  player2.style.display = 'none';
  player3.style.display = 'none';
  player4.style.display = 'none';
}

// TODO APP CONTROLLER

// App variables
const
  btnDeal = document.getElementById('btnDeal'),
  btnHit = document.getElementById('btnHit'),
  btnStand = document.getElementById('btnStand'),
  btnSplitStand = document.getElementById('btnSplitStand'),
  btnSplit = document.getElementById('btnSplit'),
  btnReSplit = document.getElementById('btnReSplit');

// Event Handlers
btnDeal.addEventListener('click', dealRound);
btnHit.addEventListener('click', hit);
btnSplit.addEventListener('click', split);
btnReSplit.addEventListener('click', reSplit);
btnStand.addEventListener('click', stand);
btnSplitStand.addEventListener('click', splitStand);

// App functions

function initNewRound() {
  resetActiveClass();
  clearHands();
  clearDisplay();

  // RESHUFFLE DECK
  if (deck.length <= 13) {
    reShuffleDeck();
  }
}

function dealHands() {
  for (let i = 0; i < 4; i++) {
    let card = dealCard();
    if (i === 0 || i === 2) {
      playerHand1.push(card);
      displayCard(card, 'player1');
    } else if (i === 1) {
      dealerHand.push(card);
      displayCard(card, 'dealer');
    } else if (i === 3) {
      dealerHand.push(card);
      // displayCard(card, 'dealer');
    }
  }
}

function resetAceValue() {
  playerHand1[0].rank === 'ace' ? playerHand1[0].value = 11 : null;
}

function dealRound() {

  // Initialize new round
  initNewRound();

  // Deal hands
  dealHands();

  // Calc playerRoundTotal
  calcPlayerRoundTotal();
  calcDealerRoundTotal();

  // Dealer gets blackjack
  if (dealerRoundTotal === 21) {
    dealerRoundTotal = blackjack;
  }

  // Player gets blackjack, split, or else
  if (playerRoundTotal1 === 21) {
    playerRoundTotal1 = blackjack;

    // Change active class from player to dealer
    player1.classList.remove('active');
    dealer.classList.add('active');

    // Display dealer's down card
    displayCard(dealerHand[1], 'dealer');

    // Console log the result
    dealerRoundTotal === 21.5 ? console.log('Push: Double Blackjack') : console.log('Blackjack! You win the hand');
  } else if (playerHand1[0].rank === playerHand1[1].rank) {
    // Display hit, split, and stand buttons and hide deal button
    btnHit.style.display = 'block';
    btnSplit.style.display = 'block';
    btnStand.style.display = 'block';
    btnDeal.style.display = 'none';
  } else {
    // Display hit and stand buttons and hide deal button
    btnHit.style.display = 'block';
    btnStand.style.display = 'block';
    btnDeal.style.display = 'none';
  }

  // Display playerRoundScore
  if (playerRoundTotal1 !== 21.5) {
    console.log(playerRoundTotal1);
  }
}

function hit() {
  // Disable split button
  btnSplit.style.display = 'none';

  // Set the card dealt to a variable
  const card = dealCard();

  // Determine the active hand, set it to playerHand, and display it
  let playerHand;

  if (player1.classList.contains('active')) {
    playerHand = playerHand1;
    displayCard(card, 'player1');
  } else if (player2.classList.contains('active')) {
    playerHand = playerHand2;
    displayCard(card, 'player2');
  } else if (player3.classList.contains('active')) {
    playerHand = playerHand3;
    displayCard(card, 'player3');
  } else if (player4.classList.contains('active')) {
    playerHand = playerHand4;
    displayCard(card, 'player4');
  }

  // Deal card to the determined hand
  playerHand.push(card);

  // Calculate player score
  const playerRoundTotal = calcPlayerRoundTotal();
  console.log(playerRoundTotal);

  // Enable re-split btn
  if (player1.classList.contains('active')) {
    playerHand1.length === 2 && playerHand1[0].rank === playerHand1[1].rank && player2.childElementCount === 0 ?
      btnReSplit.style.display = 'block' : btnReSplit.style.display = 'none';
  }

  if (player3.classList.contains('active')) {
    playerHand3.length === 2 && playerHand3[0].rank === playerHand3[1].rank && player4.childElementCount === 0 ?
      btnReSplit.style.display = 'block' : btnReSplit.style.display = 'none';
  }

  // BUST
  if (player1.classList.contains('active') && playerRoundTotal > 21.5) {
    console.log('Hand one busted: ', playerRoundTotal1);
    if (player2.childElementCount !== 0) {
      player1.classList.remove('active');
      player2.classList.add('active');
      hit();
    } else if (player3.childElementCount !== 0) {
      player1.classList.remove('active');
      player3.classList.add('active');
      hit();
    } else {
      btnDeal.style.display = 'block';
      btnHit.style.display = 'none';
      btnStand.style.display = 'none';
      btnSplitStand.style.display = 'none';
    }
  } else if (player2.classList.contains('active') && playerRoundTotal > 21.5) {
    console.log('Hand two busted: ', playerRoundTotal2);
    player2.classList.remove('active');
    player3.classList.add('active');
    hit();
  } else if (player3.classList.contains('active') && playerRoundTotal > 21.5) {
    console.log('Hand three busted: ', playerRoundTotal3);
    if (player4.childElementCount !== 0) {
      btnSplitStand.style.display = 'none';
      btnStand.style.display = 'block';
      player3.classList.remove('active');
      player4.classList.add('active');
      hit();
    } else if (playerRoundTotal1 > 21.5 && (playerRoundTotal2 === undefined || playerRoundTotal2 > 21.5)) {
      btnDeal.style.display = 'block';
      btnHit.style.display = 'none';
      btnStand.style.display = 'none';
      btnSplitStand.style.display = 'none';
      player3.classList.remove('active');
    } else {
      stand();
    }
  } else if (player4.classList.contains('active') && playerRoundTotal > 21.5) {
    console.log('Hand four busted: ', playerRoundTotal4);
    player4.classList.remove('active');
    if (playerRoundTotal1 > 21.5 && playerRoundTotal2 > 21.5 && playerRoundTotal3 > 21.5) {
      btnDeal.style.display = 'block';
      btnHit.style.display = 'none';
      btnStand.style.display = 'none';
      btnSplitStand.style.display = 'none';
    } else {
      stand();
    }
  }
  return playerRoundTotal;
}

function stand() {

  // Change active class from player to dealer
  if (player1.classList.contains('active')) {
    player1.classList.remove('active');
  } else if (player3.classList.contains('active')) {
    player3.classList.remove('active');
  } else if (player4.classList.contains('active')) {
    player4.classList.remove('active');
  }

  dealer.classList.add('active');

  // Display dealer's down card
  displayCard(dealerHand[1], 'dealer');

  // Calculate dealerRoundTotal
  calcDealerRoundTotal();

  // Dealer gets blackjack
  if (dealerRoundTotal === 21) {
    dealerRoundTotal = 21.5
  }

  // Dealer must hit up to 17
  while (dealerRoundTotal < 17) {
    let card = dealCard();
    dealerHand.push(card);
    displayCard(card, 'dealer');
    calcDealerRoundTotal();
  }

  // Dealer busts
  if (dealerRoundTotal > 21.5) {
    console.log('The dealer busted');
    if (playerRoundTotal1 < 22) {
      console.log('You win hand one: ', playerRoundTotal1, '-', dealerRoundTotal)
    }
    if (player2.childElementCount && playerRoundTotal2 < 22) {
      console.log('You win hand two: ', playerRoundTotal2, '-', dealerRoundTotal)
    }
    if (player3.childElementCount && playerRoundTotal3 < 22) {
      console.log('You win hand three: ', playerRoundTotal3, '-', dealerRoundTotal)
    }
    if (player4.childElementCount && playerRoundTotal4 < 22) {
      console.log('You win hand four: ', playerRoundTotal4, '-', dealerRoundTotal)
    }
  }

  // Dealer does not bust, so compare and display round totals
  if (dealerRoundTotal < 22) {
    if (playerRoundTotal1 < 22 && playerRoundTotal1 > dealerRoundTotal) {
      console.log('You win hand one: ', playerRoundTotal1, '-', dealerRoundTotal)
    } else if (playerRoundTotal1 < 22 && playerRoundTotal1 < dealerRoundTotal) {
      console.log('The dealer wins hand one: ', playerRoundTotal1, '-', dealerRoundTotal)
    } else if (playerRoundTotal1 < 22 && playerRoundTotal1 === dealerRoundTotal) {
      console.log('Push: ', playerRoundTotal1, '-', dealerRoundTotal)
    }
    if (playerRoundTotal2 > 0 && playerRoundTotal2 < 22 && playerRoundTotal2 > dealerRoundTotal) {
      console.log('You win hand two: ', playerRoundTotal2, '-', dealerRoundTotal)
    } else if (playerRoundTotal2 > 0 && playerRoundTotal2 < 22 && playerRoundTotal2 < dealerRoundTotal) {
      console.log('The dealer wins hand two: ', playerRoundTotal2, '-', dealerRoundTotal)
    } else if (playerRoundTotal2 < 22 && playerRoundTotal2 === dealerRoundTotal) {
      console.log('Push: ', playerRoundTotal2, '-', dealerRoundTotal)
    }
    if (playerRoundTotal3 > 0 && playerRoundTotal3 < 22 && playerRoundTotal3 > dealerRoundTotal) {
      console.log('You win hand three: ', playerRoundTotal3, '-', dealerRoundTotal)
    } else if (playerRoundTotal3 > 0 && playerRoundTotal3 < 22 && playerRoundTotal3 < dealerRoundTotal) {
      console.log('The dealer wins hand three: ', playerRoundTotal3, '-', dealerRoundTotal)
    } else if (playerRoundTotal3 < 22 && playerRoundTotal3 === dealerRoundTotal) {
      console.log('Push: ', playerRoundTotal3, '-', dealerRoundTotal)
    }
    if (playerRoundTotal4 > 0 && playerRoundTotal4 < 22 && playerRoundTotal4 > dealerRoundTotal) {
      console.log('You win hand four: ', playerRoundTotal4, '-', dealerRoundTotal)
    } else if (playerRoundTotal4 > 0 && playerRoundTotal4 < 22 && playerRoundTotal4 < dealerRoundTotal) {
      console.log('The dealer wins hand four: ', playerRoundTotal4, '-', dealerRoundTotal)
    } else if (playerRoundTotal4 < 22 && playerRoundTotal4 === dealerRoundTotal) {
      console.log('Push:', playerRoundTotal4, '-', dealerRoundTotal)
    }
  }

  // Remove hit and stand btn and add deal btn
  btnHit.style.display = 'none';
  btnStand.style.display = 'none';
  btnSplitStand.style.display = 'none';
  btnSplit.style.display = 'none';
  btnDeal.style.display = 'block';
}

function splitStand() {
  // Variables and functions
  let playerRoundTotal;

  function setActiveClass(removedFrom, addedTo) {
    removedFrom.classList.remove('active');
    addedTo.classList.add('active');
  }

  // Change active class and hit or stand
  if (player1.classList.contains('active') && player2.childElementCount === 0) {
    playerRoundTotal = playerRoundTotal1;
    setActiveClass(player1, player3);
    // Replace btnSplitStand with btnSplit
    btnSplitStand.style.display = 'none';
    btnStand.style.display = 'block';
    btnReSplit.style.display = 'none';
    hit();
  } else if (player1.classList.contains('active') && player2.childElementCount !== 0) {
    playerRoundTotal = playerRoundTotal1;
    setActiveClass(player1, player2);
    hit();
  } else if (player2.classList.contains('active')) {
    playerRoundTotal = playerRoundTotal2;
    setActiveClass(player2, player3);
    // Replace btnSplitStand with btnSplit
    btnSplitStand.style.display = 'none';
    btnStand.style.display = 'block';
    hit();
  } else if (player3.classList.contains('active') && player4.childElementCount === 0) {
    playerRoundTotal = playerRoundTotal3;
    stand();
  } else if (player3.classList.contains('active') && player4.childElementCount !== 0) {
    playerRoundTotal = playerRoundTotal3;
    setActiveClass(player3, player4);
    // Replace btnSplitStand with btnSplit
    btnSplitStand.style.display = 'none';
    btnStand.style.display = 'block';
    hit();
  } else if (player4.classList.contains('active')) {
    playerRoundTotal = playerRoundTotal4;
    stand();
  }
  return playerRoundTotal;
}

function split() {

  // Move li from player1 ul to player3 ul
  const oldChild = player1.removeChild(player1.lastChild);
  oldChild.style.marginLeft = '0';
  player3.style.display = 'flex';
  player3.appendChild(oldChild);

  // Split hands in data module
  playerHand3 = [playerHand1[1]];
  playerHand1 = [playerHand1[0]];

  resetAceValue();

  // Set player round totals
  playerRoundTotal1 = playerHand1[0].value;
  playerRoundTotal3 = playerHand3[0].value;

  hit();

  // Change buttons
  btnSplit.style.display = 'none';
  btnStand.style.display = 'none';
  btnSplitStand.style.display = 'block';

  if (playerHand1[0].rank === playerHand1[1].rank) {
    btnReSplit.style.display = 'block';
  }
}

function reSplit() {
  // Variables and functions
  function displaySplitHand(handFrom, handTo) {
    let oldChild = handFrom.removeChild(handFrom.lastChild);
    oldChild.style.marginLeft = '0';
    handTo.style.display = 'flex';
    handTo.appendChild(oldChild);
  }

  function reSplitHand1() {
    playerHand2 = [playerHand1[1]];
    playerHand1 = [playerHand1[0]];
  }

  function reSplitHand3() {
    playerHand4 = [playerHand3[1]];
    playerHand3 = [playerHand3[0]];
  }

  // Hide re-split btn
  btnReSplit.style.display = 'none';

  if (player1.classList.contains('active')) {

    displaySplitHand(player1, player2);

    reSplitHand1();

    resetAceValue();

    // Set playerRoundTotal values
    playerRoundTotal1 = playerHand1[0].value;
    playerRoundTotal2 = playerHand2[0].value;

    hit();
  } else if (player3.classList.contains('active')) {

    // Replace btnSplitStand with btnSplit
    btnStand.style.display = 'none';
    btnSplitStand.style.display = 'block';

    displaySplitHand(player3, player4);

    reSplitHand3();

    resetAceValue();

    // Set playerRoundTotal values
    playerRoundTotal3 = playerHand3[0].value;
    playerRoundTotal4 = playerHand4[0].value;

    hit();
  }
}

/* TODO

change deck shuffle
implement a betting system
if splitting aces, player only draws one more card

 */


/*

function splitHand (handFrom, handTo) {
    let oldChild = handFrom.removeChild(handFrom.lastChild);
    handTo.style.display = 'flex';
    handTo.appendChild(oldChild);
  }


function split() {

  if (player1.classList.contains('active') && player3.childElementCount === 0) {
    // Split hands in ui
    splitHand (player1, player3);

    // Split hands in data
    playerHand1 = playerHand1[0].value;
    playerHand3 = playerHand3[0].value;

    resetAceValue();

    // Set player round totals
    playerRoundTotal1 = playerHand1[0].value;
    playerRoundTotal3 = playerHand3[0].value;

    hit();
  } else if (player1.classList.contains('active') && player3.childElementCount !== 0) {
    // Split hands in ui
    splitHand (player1, player2);

    // Split hands in data
    playerHand1 = playerHand1[0].value;
    playerHand2 = playerHand2[0].value;

    resetAceValue();

    // Set player round totals
    playerRoundTotal1 = playerHand1[0].value;
    playerRoundTotal2 = playerHand2[0].value;

    hit();
    } else if (player3.classList.contains('active') && player4.childElementCount === 0) {
    // Split hands in ui
    splitHand (player3, player4);

    // Split hands in data
    playerHand3 = playerHand3[0].value;
    playerHand4 = playerHand4[0].value;

    resetAceValue();

    // Set player round totals
    playerRoundTotal1 = playerHand1[0].value;
    playerRoundTotal3 = playerHand3[0].value;

    hit();
  }

}
 */