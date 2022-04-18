## Javascript Implementation

- [Deck function](#)
- [](#)
- [](#)
- [](#)
- [](#)

## Deck Function

The deck function returns an array of elements which represent all the different cards in a card.

```
export function deck() {
  const cards = []

  const suits = ['D', 'C', 'S', 'H']
  const numbers = [
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
  // Use for loop with direct reference to element entries with for
  for (let i in suits) {
    for (let j in numbers) {
      let currentCard = numbers[j] + suits[i]
      cards.push(currentCard)
    }
  }
  return cards
}

```
