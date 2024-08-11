# 21 Blackjack Browser Game

Playing the popular casino game within your browser!

## Technologies Used

- React
- Tailwind
- GitHub Action

## Rules

Blackjack is a popular card game typically played in casinos, where the objective is to beat the dealer by having a hand value closest to 21 without exceeding it. Here are the basic rules of Blackjack:

### 1. Objective

The goal is to have a hand value of 21 or as close to 21 as possible without exceeding it.

### 2. Card Values

Number Cards (2-10): Each card is worth its face value.
Face Cards (Jack, Queen, King): Each face card is worth 10 points.
Ace: An Ace can be worth either 1 or 11 points, depending on which value benefits the hand more.

### 3. The Game Setup

Players: Blackjack is usually played between one or more players and a dealer.
Deck: The game is typically played with one or more standard 52-card decks.
Betting: Before the cards are dealt, each player places a bet.

### 4. Dealing the Cards

Each player is dealt two cards, typically face up.
The dealer also receives two cards, usually one face up (the "upcard") and one face down (the "hole card").

### 5. Gameplay

- Natural Blackjack: If a player or the dealer has an Ace and a 10-point card (10, Jack, Queen, King) as their initial two cards, they have a "Blackjack" and win automatically unless both the dealer and player have Blackjack, which results in a push (tie).

- Player's Turn:
  - Hit: The player can request additional cards to try to get closer to 21.
  - Stand: The player can choose to stop receiving cards and keep their current hand.
  - Double Down: The player can double their initial bet and receive exactly one more card.
  - Split: If the player's first two cards are of the same value, they can split them into two separate hands, placing an additional bet equal to the original bet.
  - Surrender: Some versions of the game allow a player to forfeit their hand and lose half of their bet (this option is usually available only as the first decision of the hand).

- Dealer's Turn:
  - The dealer reveals their hole card after all players have completed their actions.
  - The dealer must hit until their hand totals 17 or higher. In some games, the dealer must also hit on a "soft 17" (a hand containing an Ace counted as 11, like Ace-6).

### 6. Winning and Losing

- Bust: If a player's hand exceeds 21, they "bust" and automatically lose, regardless of the dealer's hand.
- Winning: If the player has a hand value closer to 21 than the dealer, the player wins and is paid out at 1:1 on their bet.
- Blackjack Payout: If a player has a Blackjack (an Ace and a 10-point card), they are usually paid out at 3:2, unless the dealer also has a Blackjack, resulting in a push.
- Push: If both the player and the dealer have the same hand value, it's a tie, and the player's bet is returned.

### 7. Special Rules (Variations)

Insurance: If the dealer's upcard is an Ace, players can place an "insurance" bet, usually half the original bet, which pays 2:1 if the dealer has a Blackjack.
Soft 17 Rule: In some games, the dealer must hit on a soft 17 (Ace + 6), while in others, the dealer stands.

### 8. Strategy

Blackjack has an element of strategy, as players can decide whether to hit, stand, double down, split, or surrender based on the cards they and the dealer have. Basic strategy charts are available to help players make optimal decisions.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
