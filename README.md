# 21 Blackjack

This repository contains the code for a Blackjack game playable in the terminal. The game has been coded in both Javascript and Python, and in both a functional-based manner and object-orientated manner.

## Table of Contents

- [Setup](#setup)
- [Technologies](#technologies)
- [Deno](#deno)
- [Implementation](#implementation)
- [Game Logic](#game-logic)
- [License](#license)
- [Contact](#contact)

## Setup

To get started, clone this repository to your local machine.

To run the Javascript versions, please ensure you have [Deno](https://deno.land/#installation) installed on your machine to execute Javascript files. Deno is a modern runtime for Javascript. Open up your terminal or a code editor, like Visual Studio Code, and navigate to the folder, Javascript. Then enter the following command to start the game:

```
deno run blackjack.js
```

To run the Python versions, please ensure you have [Python](https://www.python.org/downloads/) installed on your local machine to execute Python scripts.

## Technologies

- [Deno](https://deno.land/#installation)
- Python

## Deno

[Deno](https://deno.land/#installation) is a modern alternative to [Node.js](https://nodejs.org/en/), which is also a JavaScript Runtime. However, Deno provides a number of benefits when compared to Node. In fact, both open-source technologies were developed by the same creator. Deno was created to address issues in Node, such as a lack of attention to security, and lack of support for TypeScript.

## Implementation

This game has been implemented in different languages and paradigms to demonstrated understanding of:

- Python
- Javascript
- Functional programming
- Object-oriented programming

## Game Logic

When the scripts are ran, the game begins by shuffling a deck. The player's turn is first and two cards are randomly drawn for them. The 'score' of the hand depends on which cards were drawn.

- If the player achieves a score of 21 on their first turn, their turn automatically ends and the dealer's turn begins.
- Otherwise, the player has a choice to hit or stick.
  - If they hit and bust (score > 21), the player loses and the dealer wins.
  - If they reach 21, the player's turn automatically ends
  - If their score is under 21 again, the prompt to hit/stick is repeated.

If the player sticks or reaches 21, the player's turn ends and the dealer's turn starts. The dealer will draw 2 random cards from deck, which excludes the cards drawn by the player initially.

- If the dealer achieves a score of 21 on their first round, their turn automatically ends.
- If the dealer achieves a score of less than 16, the dealer will hit and draw another card.
  - If the dealer's score is still less than 16, the dealer will hit, and vice versa.
  - If the dealer's score is exactly 21, their turn will automatically end.
  - If the dealer's score exceeds 21, the dealer loses and the player wins.

## Next Steps

- Implement multiple rounds and keep track of score
- Register a user
- Leaderboard system
- Add money to gamble
- Make the game appear more visual
- Create a react web application based on this

## License

The license for this project can be found [here](https://github.com/FahmidulHaquee/Blackjack-Game/blob/main/LICENSE).

## Contact

Please feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/fahmidul-haque-b7a96b123/) with any questions.
