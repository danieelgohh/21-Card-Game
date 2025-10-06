const suits = ["♠","♥","♦","♣"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const grid = document.getElementById("cardGrid");
const result = document.getElementById("result");

let deck = []; cards = []; round = 0;

function shuffle(d) {
  for (let i = d.length; i > 0; i--) {
    j = Math.floor(Math.random * (i + 1)); // i + 1 to ensure there is a possibility card same position
    [d[i], d[j]] = [d[j], d[i]];
  }
}

function newDeck() {
  deck = [];

  for (x of suits) {
    for (y of values) {
      deck.push(x + y);
    }
  }

  shuffle(deck);
  cards = deck.slice(0,21);

  render();
}

function render() {
  // Clear existing cards from prev round
  grid.innerHTML = "";

  // Create a div for each cards
  cards.forEach((card, i) => {
    const cell = document.createElement("div");
    cell.className = "card";

    const display = document.createElement("div");
    display.className="display";

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

newDeck();