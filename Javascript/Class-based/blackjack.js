import { getDefaultLogger } from "./support/logging.ts";

class Game {
  deck = [];
  playersHand = [];
  dealersHand = [];
  playersPoints = [];
  dealersPoints = [];
  LOSE_MESSAGE = "You lose!";
  WIN_MESSAGE = "You win!";
  DRAW_MESSAGE = "Draw!";
  defaultLogger = await getDefaultLogger();

  createDeck() {
    const cards = [];
    const suits = ["D", "C", "S", "H"];
    const numbers = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (let i in suits) {
      for (let j in numbers) {
        let currentCard = numbers[j] + suits[i];
        cards.push(currentCard);
      }
    }
    this.deck = cards;
  }

  shuffleDeck(seed = 1) {
    let currentIndex = this.deck.length;
    let temporaryValue, randomIndex;

    let random = () => {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    while (0 !== currentIndex) {
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = this.deck[currentIndex];
      this.deck[currentIndex] = this.deck[randomIndex];
      this.deck[randomIndex] = temporaryValue;
    }
  }

  pointsFor(hand) {
    const ace = "A";
    const cardsScore10 = ["J", "Q", "K"];
    const numberCards = ["2", "3", "4", "5", "6", "7", "8", "9"];

    let points = 0;

    if (hand.length >= 6) {
      points += 21;
    } else if (hand[0][0] && hand[1][0] === "A") {
      points += 21;
    } else {
      for (let card of hand) {
        if (card.slice(0, 2) === "10") {
          points += 10;
        } else if (card.includes(ace)) {
          points += 11;
        } else if (cardsScore10.includes(card[0])) {
          points += 10;
        } else if (numberCards.includes(card[0])) {
          points += parseInt(card[0]);
        }
      }
    }
    return points;
  }

  playerTurn()

  dealerTurn()

  decideVictor()
}

const newGame = new Game();
newGame.createDeck();
console.log(newGame.deck);
newGame.shuffleDeck();
console.log(newGame.deck);
