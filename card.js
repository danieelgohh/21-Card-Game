const suits = ["♠","♥","♦","♣"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const grid = document.getElementById("cardGrid");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart");
const colBtn = [document.getElementById("col1"), document.getElementById("col2"), document.getElementById("col3")]

let deck = [], cards = [], round = 0, busy = false;

function shuffle(d) {
  for (let i = d.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1)); // i + 1 to ensure there is a possibility card same position
    [d[i], d[j]] = [d[j], d[i]];
  }
}

function newDeck() {
  enableControls(false);
  deck = [];

  for (x of suits) {
    for (y of values) {
      deck.push(x + y);
    }
  }

  round = 0;
  result.textContent = "";
  restartBtn.style.display = "none";

  shuffle(deck);
  cards = deck.slice(0,21);

  render();
  setTimeout(() => enableControls(true), 500);
}

function render() {
  // Clear existing cards from prev round
  grid.innerHTML = "";

  // Create a div for each cards
  cards.forEach((card) => {
    const cell = document.createElement("div");
    cell.className = "card";

    const display = document.createElement("div");
    display.className = "display";

    setTimeout(() => display.classList.add("flipped"), 50);
    setTimeout(() => display.classList.remove("flipped"), 420);

    const front = document.createElement("div");
    front.className = "face front";
    front.textContent = card;

    const back = document.createElement("div");
    back.className = "face back";
    back.textContent = "🃏";

    display.appendChild(front);
    display.appendChild(back);
    cell.appendChild(display);
    grid.appendChild(cell);
  });
}

function chosenCol(colIndex) {
  if (busy) return;
  busy = true;
  enableControls(false);
  round ++;

  // Highlight the chosen column
  const cardsUsed = [...grid.children];
  const colSelected = cardsUsed.filter((_,i) => i % 3 === colIndex);
  colSelected.forEach(c => c.querySelector(".display").classList.add("highlight"));

  // Rearrange the cards by columns
  const cols = [[], [], []]
  for (let i = 0; i < cards.length; i ++) {
    cols[i % 3].push(cards[i])
  }
  
  setTimeout(() => {
    if (colIndex === 0) {
      cards = [...cols[1], ...cols[0], ...cols[2]];
    } else if (colIndex === 1) {
      cards = [...cols[0], ...cols[1], ...cols[2]];
    } else {
      cards = [...cols[0], ...cols[2], ...cols[1]];
    }

    render();
    busy = false;
    enableControls(true);

    if (round === 3) {
      result.textContent = "✨ Your card is: " + cards[10] + " ✨";
      restartBtn.style.display = "inline-block";
      enableControls(false);
    }
  }, 1000)
}

function enableControls (allowed) {
  colBtn.forEach(cb => cb.disabled = !allowed)
}

colBtn[0].addEventListener("click", () => chosenCol(0));
colBtn[1].addEventListener("click", () => chosenCol(1));
colBtn[2].addEventListener("click", () => chosenCol(2));
restartBtn.addEventListener("click", newDeck);

newDeck();