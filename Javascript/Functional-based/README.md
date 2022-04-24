## Javascript Implementation

Functional, Javascript implementation of command line Blackjack.

- [Run Script](#run-script)
- [deck()](#deck)
- [pointsFor()](<#pointsfor()>)
- [playerTurn()](#playerturndeck-hand-logger--defaultlogger)
- [dealerTurn()]()
- [play()](#playseed--datenow-logger--defaultlogger)
- [Support files](#)

## Run Script

As mentioned before, to run this game, open up your terminal (Windows Powershell/Terminal) and navigate to the project folder. Then enter:

```
deno run blackjack.js
```

Please ensure you have Deno installed on your local machine.

## deck()

The deck function returns an array of elements which represent all the different cards in a card. A nested for loop is used to create all combinations of elements from the suits and numbers array.

```js
export function deck() {
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
  return cards;
}
```

## pointsFor(hand)

This function accepts a hand of cards as an input and returns the score for this hand. A number of constants are created to represent the different scores that a card can have.

Special conditions which allow the player to automatically win are checked for first. If the hand length is greater than or equal to 6, or if the hand contains two aces, the points are set to 21.

Otherwise, the score is calculated by checking the number/rank of each card in the hand. The suit can be ignored in this calculation.

```js
export function pointsFor(hand) {
  const ace = "A"; // Ace increases score by 11
  const cardsScore10 = ["J", "Q", "K"]; // These cards increase score by 10
  const numberCards = ["2", "3", "4", "5", "6", "7", "8", "9"]; // These cards increase score by face value

  let points = 0; // Initialise and track points

  if (hand.length >= 6) {
    // 1st condition to check: 6 or more cards?
    points += 21;
  } else if (hand[0][0] && hand[1][0] === "A") {
    // 2nd condition: two aces present results in automatic 21 score
    points += 21;
  } else {
    // Otherwise, calculate score from every card. Can ignore the suit and only focus on number
    for (let card of hand) {
      // Loop through each card in hand
      // Check if a 10 is present

      if (card.slice(0, 2) === "10") {
        // Add 10 points
        points += 10;
      }

      // Check if an Ace is present
      else if (card.includes(ace)) {
        // Add 11 points
        points += 11;
      }

      // Check if a 10 card is present
      else if (cardsScore10.includes(card[0])) {
        points += 10;
      }

      // Check if a number card is present
      else if (numberCards.includes(card[0])) {
        points += parseInt(card[0]);
      }
    }
  }
  return points;
}
```

## playerTurn(deck, playerHand, logger = defaultLogger)

This function enables the player to make choice of whether to hit or stick. 3 inputs are passed to this function, including the deck, player's hand, and a logger. The deck is used to draw cards from, and excludes cards drawn previously. The player's hand is drawn as part of the main play() function, and is passed to determine the dealer's points and next moves. The logger function is used to create an output on the command line which is suitable for feeding into tests, as opposed to the usual console.log() which cannot feed it's output.

First, the user is prompted, and then an action is performed based on their input. If the user decides to hit, the score for their hand is re-calculated. Then, an object is returned based on their hand score:

return {  
&nbsp;&nbsp; continueTurn: false,  
&nbsp;&nbsp; didPlayerBust: false,  
&nbsp;&nbsp; didPlayer21: false  
}

As the reader may guess, the different object properties represent conditions which may occur for the player.

- If the player has less than 21 points, the 'continueTurn' property returns true, which indicates to the play function that the player's turn will continue. This will trigger the playerTurn function again, giving the user another prompt to hit or stick. The other properties will return false.
- If the player has exactly 21 points, the 'continueTurn' property returns false. Instead, the 'didPlayer21' property returns true. This will end the player's turn and begin the dealer's turn.
- If the player exceeds 21 points, the 'didPlayerBust' property returns true. This indicates to the game that the player automatically loses.

If the user decides to stick, their turn will end and the dealer's turn will start. If the user did not enter a valid command, they will be prompted to enter their command again.

```js
export function playerTurn(deck, hand, logger = defaultLogger) {
  //Accept the choice from the player
  const action = window.prompt('What do you want to do? ("hit" or "stick")\n');

  // Perform action presented by Player
  switch (action) {
    case "hit": {
      // Draw a card
      logger.info("Hitting");
      hand.push(deck.shift());

      // Calculate Player's points
      let playerPoints = pointsFor(hand);
      logger.info(
        `Your hand is ${hand.join(", ")}\n(${pointsFor(hand)} points)\n`
      );

      // Continue or end turn based on Player points
      if (playerPoints === 21) {
        logger.info(`You have 21.\n`);

        return {
          truthy: false, // End player's turn
          didPlayerBust: false,
          didPlayer21: true,
        };
      } else if (playerPoints < 21) {
        // If Player's points are less than 21
        logger.info("You have less than 21, and can make another move.\n");

        return {
          truthy: true, // Continue the player's turn
          didPlayerBust: false,
          didPlayer21: false,
        };
      } else if (playerPoints > 21) {
        logger.info("You went over 24!\n");

        return {
          truthy: false, // End player's turn
          didPlayerBust: true,
          didPlayer21: false,
        };
      }
    }
    case "stick": {
      // End the player's turn
      logger.info("Sticking\n");
      return false; // End's the player turn
    }
    default: {
      // Unknown action, i.e. user enters typo
      console.log("Command not recognised. Type Hit or Stick\n");
      return true; // Repeat turn, no further action
    }
  }
}
```

## dealerTurn(deck, dealerHand, logger = defaultLogger)

This function is responsible for initiating the dealer's turn as part of the game. 3 inputs are passed to this function, including the deck, dealer's hand, and a logger. The deck is used to draw cards from, and excludes cards drawn previously. The dealer's hand is drawn as part of the main play() function, and is passed to determine the dealer's points and next moves. The logger function is used to create an output on the command line which is suitable for feeding into tests, as opposed to the usual console.log() which cannot feed it's output.

```js
export function dealerTurn(deck, dealerHand, logger = defaultLogger) {
  // Evaluate the dealer's points
  let dealerPoints = pointsFor(dealerHand);
  logger.info(
    `Dealer\'s hand is ${dealerHand.join(", ")}\n(${dealerPoints} points)\n`
  );

  // Calculate current points before next move
  if (dealerPoints < 17) {
    // Dealer has < 17 points
    var action = "hit";
  } else if (dealerPoints >= 17 && dealerPoints < 21) {
    // Dealer has over 17 and less than 21
    var action = "stick";
  } else if (dealerPoints > 21) {
    logger.info("Dealer has busted\n");
    didDealerBust = true;
  }
  switch (action) {
    case "hit": {
      // Dealer draws
      logger.info("Dealer is hitting\n");
      dealerHand.push(deck.shift());
      dealerPoints = pointsFor(dealerHand);

      return true; // Dealer gets another move
    }
    case "stick": {
      // Dealer sticks
      logger.info("Dealer is sticking");
      logger.info(
        `Dealer ends this round with a hand of ${dealerHand.join(
          ", "
        )}\n With ${dealerPoints} points`
      );

      return false; // End the Dealer's turn
    }
  }
}
```

## play({seed = Date.now(), logger = defaultLogger = {})

This function creates and shuffles the deck. This function can be considered the main, over-arching function which contains helper functions described previously that control smaller parts of the game logic. The play function dictates when the player's and dealer's turn starts and ends, and ultimately decides whether the player wins, draws or ties.

```js
export function play({ seed = Date.now(), logger = defaultLogger } = {}) {
  // Shuffle the deck
  const shuffledDeck = shuffle(deck(), seed);

  // Start with Player
  // Player draws 2 cards at random
  logger.info("Player's turn first");
  let playerHand = [shuffledDeck.shift(), shuffledDeck.shift()];

  // Present Player with cards and points from first draw
  logger.info(
    `Your hand is ${playerHand.join(", ")}\n(${pointsFor(playerHand)} points)\n`
  );

  // While it is the player's turn..
  let isPlayerTurn = { isPlayerPlaying: true }; // Initialise for while loop

  // .. Keep the Player going until he sticks or busts
  while (isPlayerTurn.truthy) {
    // gives undefined
    isPlayerTurn = playerTurn(shuffledDeck, playerHand, logger);
  }

  // Before proceeding to the Dealer's turn
  // Check if Player busted
  if (isPlayerTurn.didPlayerBust) {
    return LOSE_MESSAGE;
  }

  // Check if Player hit 21
  if (isPlayerTurn.didPlayer21) {
    return WIN_MESSAGE;
  }

  // Dealer's turn
  logger.info("Dealer's turn now");
  let dealerHand = [shuffledDeck.shift(), shuffledDeck.shift()];
  let isDealerTurn = true;

  // Keep playing while it is the dealer's turn
  while (isDealerTurn) {
    isDealerTurn = dealerTurn(shuffledDeck, dealerHand, logger);
  }

  // Before proceeding to the score comparison
  // Check if Dealer busted
  if (didDealerBust) {
    return WIN_MESSAGE;
  }

  // Compare Score
  if (playerPoints > dealerPoints) {
    return WIN_MESSAGE;
  } else if (playerPoints === dealerPoints) {
    return DRAW_MESSAGE;
  } else {
    return LOSE_MESSAGE;
  }
}
```

## Tests

Deno is installed with a built-in tests runner. You can run the tests file by entering the following command on the command line:

```
deno test tests.js
```

A number of unit tests have been written to tests small parts of the game, and if the game logic is being followed correctly. The following test checks to see if an unshuffled deck is created with all the cards needed.

```js
Deno.test("deck(): a fresh deck in 'new deck order'", () => {
  // prettier-ignore
  assertEquals(deck(), [
    "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
    "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
    "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC",
    "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH"
  ])
});
```

Tests include a description for part of the application logic they are testing for.

## Support files

There are a number of files which contain functions that add important functionality to the game, such as the logger, shuffle and the testing suite.

## Logging

The logger is used to help with the testing instead of using console.log() to output messages to the console (terminal) by checking the output of our game.

```js
export async function getDefaultLogger() {
  await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("DEBUG", { formatter: "{msg}" }),
    },
    loggers: {
      default: {
        level: "DEBUG",
        handlers: ["console"],
      },
    },
  });
  return log.getLogger();
}
```

## Shuffle

The shuffle.js file contains a shuffle function which returns an array with the original elements mixed into random positions. It takes 2 arguments: an array (the deck) and a seed. The seed input helps to reproduce the game to help write automated tests. If the same seed is entered twice, the deck returned will be the same. Outside of tests, the time will be passed into the function to keep the shuffling random.

This function is pseudorandom in the sense that the array generated will be random, but only with varying inputs. Since we have technically control the inputs to this function, the same result can be produced if desired.

```js
export default function shuffle(array, seed = 1) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  let random = () => {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
```

## Testing

There are a number of functions here which help with the unit tests in the tests.js file. These are written to here for

```js
export function playerChooses(choices) {
  return stub(window, "prompt", (p) => {
    return choices.shift();
  });
}

export function takePlayerTurn({ seed, logger } = {}) {
  let turnDeck;

  if (!seed) {
    turnDeck = deck();
  } else {
    turnDeck = shuffle(deck(), seed);
  }

  let playerHand = [turnDeck.shift(), turnDeck.shift()];
  let isPlayerTurn = true;

  while (isPlayerTurn) {
    isPlayerTurn = playerTurn(turnDeck, playerHand, logger);
  }
}
```
