// deno-lint-ignore-file no-fallthrough

const LOSE_MESSAGE = "You lose!"
const WIN_MESSAGE = "You win!"
const DRAW_MESSAGE = "Draw!"

export class Card {
  constructor(rank, suit) {
    this.rank = rank
    this.suit = suit.toUpperCase()
    this.points = this.cardPoints()
  }

  toString() {
    return `${this.rank}${this.suit}`
  }

  cardPoints() {
    const ace = 'A'
    const cardsScore10 = ['J', 'Q', 'K']
    const numberCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10']

    if (numberCards.includes(this.rank)) 
      this.points += parseInt(this.rank)
    else if (cardsScore10.includes(this.rank)) 
      this.points += 10
    else if (this.rank === ace)
      this.points += 11
  }
}

export class Hand {
  constructor(cards) {
    if (!cards.every((card) => card instanceof Card))
      throw new TypeError('A Hand can only contain Cards')
    this.cards = cards
    this.numberOfCards = cards.length
    this.points = this.handPoints()
  }

  handPoints() {
    if (this.numberOfCards > 5) 
      this.points += 21
    else if (this.numberOfCards === 0) 
      throw new Error('Can\'t calculate points for empty hand!')
    else 
      this.cards.forEach(card => this.cardPoints(card))
  }

  cardPoints() {
    this.points += this.cards.card.points
  }
}

export class Deck {
  constructor() {
    this.suits = ['D', 'C', 'S', 'H']
    this.ranks = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K'
    ]
    this.cards = this.createDeck()
  }

  createDeck() {
    const newCards = []
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        const card = rank + suit
        newCards.push(card)
      }
    }
    return newCards
  }

  draw() {
    const card = this.cards.shift()
    const rank = card[0]
    const suit = card[1]
    return new Card(rank, suit)
  }

  shuffle(seed = 1) {
    let currentIndex = this.cards.length
    let temporaryValue, randomIndex

    const random = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    };

    while (0 !== currentIndex) {
      randomIndex = Math.floor(random() * currentIndex)
      currentIndex -= 1
      temporaryValue = this.cards[currentIndex]
      this.cards[currentIndex] = this.cards[randomIndex]
      this.cards[randomIndex] = temporaryValue
    }
  }
}

class Player {
  constructor() {
    this.continueTurn = true;
    this.didPlayer21 = false;
    this.didPlayerBust = false;
  }
}

const deck = new Deck()
deck.shuffle()

const player = new Player()
console.log('Player\'s turn first')
const playersHand = new Hand([deck.draw(), deck.draw()])
console.log(`Your hand is ${playersHand.cards}\n(${pointsFor(playersHand.points)} points)\n`)

while (player.continueTurn) {
  const action = window.prompt("What do you want to do? (hit or stick)\n")

  switch (action) {
    case "hit": {
      console.log("Hitting");
      playersHand.cards.push(deck.draw());
      console.log(
        `Your hand is ${playersHand.cards}\n(${pointsFor(
          playersHand.points
        )} points)\n`
      );
      if (playersHand.points == 21) {
        console.log(`You have 21.\n`);
        player.continueTurn = false
        player.didPlayerBust = false
        player.didPlayer21 = true
      } 
      else if (playerPoints < 21) {
        console.log("You have less than 21, and can make another move.\n")
        player.continueTurn = true
        player.didPlayerBust = false
        player.didPlayer21 = false
      } 
      else if (playerPoints > 21) {
        console.log("You went over 21!\n");
        player.continueTurn = false
        player.didPlayerBust = true
        player.didPlayer21 = false
      }
    }
    case "stick": {
      console.log("Sticking\n");
      player.continueTurn = false
    }
    default: {
      console.log("Command not recognised. Type Hit or Stick\n");
      player.continueTurn = true
    }
  }
}

if (player.didPlayerBust)
  throw new Error(LOSE_MESSAGE)

const dealer = new Player()
console.log('Dealer\'s turn now')
const dealersHand = new Hand([deck.draw(), deck.draw()])
console.log(`Dealer's hand is ${dealersHand.cards}\n(${dealersHand.points} points)\n`)

while (dealer.continueTurn) {
  let action = ''
  if (dealerPoints < 17)
    action = "hit";
  else if (dealerPoints >= 17 && dealerPoints <= 21)
    action = "stick";
  else if (dealerPoints > 21) 
    throw new Error("Dealer has busted\n", WIN_MESSAGE)
  
  switch (action) {
    case "hit": {
      console.log("Dealer is hitting\n");
      dealersHand(deck.draw());
      dealer.continueTurn = true
      dealer.didPlayer21 = false
      dealer.didPlayerBust = false
    }
    case "stick": {
      console.log("Dealer is sticking");
      console.log(`Dealer ends this round with a hand of ${dealersHand.cards}\n With ${dealersHand.points} points`)
      dealer.continueTurn = false
      dealer.didPlayer21 = false
      dealer.didDealerBust = false
    }
  }
}

if (dealer.didPlayerBust)
  throw new Error(WIN_MESSAGE)
else if (playersHand.points > dealersHand.points) 
  throw new Error(WIN_MESSAGE)
else if (playersHand.points == dealersHand.points) 
  throw new Error(DRAW_MESSAGE);
else 
  throw new Error(LOSE_MESSAGE);