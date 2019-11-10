export function displayCard(card, person) {
  const li = document.createElement('li');
  const left = document.getElementById(person).childElementCount * 6.25 + 'vw';
  if (person !== 'dealer') {
    li.innerHTML = `<img class="card" src="./images/${card.id}.png" alt=""/>`;
    li.style.marginLeft = left;
    document.getElementById(person).appendChild(li);
  } else {
    li.innerHTML = `<img class="card" src="./images/${card.id}.png" alt=""/>`;
    document.getElementById(person).appendChild(li);
  }
}

export function clearDisplay() {
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