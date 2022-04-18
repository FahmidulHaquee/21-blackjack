import shuffle from "./support/shuffle.js";
import { getDefaultLogger } from "./support/logging.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

// Set messages
const LOSE_MESSAGE = "Bust! You lose!";
const WIN_MESSAGE = "Hooray! You win!";
const DRAW_MESSAGE = "Draw!";
const defaultLogger = await getDefaultLogger();

// Create deck
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
  // Use for loop with direct reference to element entries with for
  for (let i in suits) {
    for (let j in numbers) {
      let currentCard = numbers[j] + suits[i];
      cards.push(currentCard);
    }
  }
  return cards;
}

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

if (import.meta.main) {
  const { seed } = parse(Deno.args);
  play({ seed });
}
