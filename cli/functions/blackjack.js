import shuffle from "./support/shuffle.js";
import { getDefaultLogger } from "./support/logging.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const LOSE_MESSAGE = "You lose!";
const WIN_MESSAGE = "You win!";
const DRAW_MESSAGE = "Draw!";
const defaultLogger = await getDefaultLogger();

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

export function pointsFor(hand) {
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

export function playerTurn(deck, playerHand, logger = defaultLogger) {
  const action = window.prompt('What do you want to do? ("hit" or "stick")\n');

  switch (action) {
    case "hit": {
      logger.info("Hitting");
      playerHand.push(deck.shift());

      let playerPoints = pointsFor(playerHand);
      logger.info(
        `Your hand is ${playerHand.join(", ")}\n(${pointsFor(
          playerHand
        )} points)\n`
      );

      if (playerPoints === 21) {
        logger.info(`You have 21.\n`);
        return {
          continueTurn: false,
          didPlayerBust: false,
          didPlayer21: true,
          playerPoints: pointsFor(playerHand),
        };
      } else if (playerPoints < 21) {
        logger.info("You have less than 21, and can make another move.\n");
        return {
          continueTurn: true,
          didPlayerBust: false,
          didPlayer21: false,
          playerPoints: pointsFor(playerHand),
        };
      } else if (playerPoints > 21) {
        logger.info("You went over 21!\n");
        return {
          continueTurn: false,
          didPlayerBust: true,
          didPlayer21: false,
        };
      }
    }
    case "stick": {
      logger.info("Sticking\n");
      return false;
    }
    default: {
      console.log("Command not recognised. Type Hit or Stick\n");
      return true;
    }
  }
}

export function dealerTurn(deck, dealerHand, logger = defaultLogger) {
  let dealerPoints = pointsFor(dealerHand);
  logger.info(
    `Dealer\'s hand is ${dealerHand.join(", ")}\n(${dealerPoints} points)\n`
  );

  if (dealerPoints < 17) {
    var action = "hit";
  } else if (dealerPoints >= 17 && dealerPoints <= 21) {
    var action = "stick";
  } else if (dealerPoints > 21) {
    logger.info("Dealer has busted\n");
    return {
      continueTurn: false,
      didDealerBust: true,
    };
  }
  switch (action) {
    case "hit": {
      logger.info("Dealer is hitting\n");
      dealerHand.push(deck.shift());
      dealerPoints = pointsFor(dealerHand);

      return {
        continueTurn: true,
        didDealerBust: false,
      };
    }

    case "stick": {
      logger.info("Dealer is sticking");
      logger.info(
        `Dealer ends this round with a hand of ${dealerHand.join(
          ", "
        )}\n With ${dealerPoints} points`
      );

      return {
        continueTurn: false,
        didDealerBust: false,
        dealerPoints: pointsFor(dealerHand),
      };
    }
  }
}

export function play({ seed = Date.now(), logger = defaultLogger } = {}) {
  // Create deck
  const shuffledDeck = shuffle(deck(), seed);

  // Player's turn
  logger.info("Player's turn first");
  let playerHand = [shuffledDeck.shift(), shuffledDeck.shift()];

  logger.info(
    `Your hand is ${playerHand.join(", ")}\n(${pointsFor(playerHand)} points)\n`
  );

  let isPlayerTurn = playerTurn(shuffledDeck, playerHand, logger);
  while (isPlayerTurn.continueTurn === true) {
    isPlayerTurn = playerTurn(shuffledDeck, playerHand, logger);
  }

  if (isPlayerTurn.didPlayerBust === true) {
    logger.info(LOSE_MESSAGE);
    return null;
  } else if (isPlayerTurn.didPlayer21 === true) {
    logger.info(WIN_MESSAGE);
    return null;
  }

  // Dealer's turn

  logger.info("Dealer's turn now");
  let dealerHand = [shuffledDeck.shift(), shuffledDeck.shift()];

  let isDealerTurn = dealerTurn(shuffledDeck, dealerHand, logger);
  while (isDealerTurn.continueTurn === true) {
    isDealerTurn = dealerTurn(shuffledDeck, dealerHand, logger);
  }

  if (isDealerTurn.didDealerBust) {
    logger.info(WIN_MESSAGE);
    return null;
  }

  if (isPlayerTurn.playerPoints > isDealerTurn.dealerPoints) {
    logger.info(WIN_MESSAGE);
    return null;
  } else if (isPlayerTurn.playerPoints === isDealerTurn.dealerPoints) {
    logger.info(DRAW_MESSAGE);
    return null;
  } else {
    logger.info(LOSE_MESSAGE);
    return null;
  }
}

if (import.meta.main) {
  const { seed } = parse(Deno.args);
  play({ seed });
}
