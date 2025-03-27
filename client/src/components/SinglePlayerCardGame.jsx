import { useState } from 'react';

const values = ["♠", "♣", "♥", "♦", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J"];

// Create a deck of cards and shuffle them
const deck = [...values, ...values].sort(() => 0.5 - Math.random());
const defaultState = { index: null, value: null };

function SinglePlayerCardGame({ gamePoints, setGamePoints }) {  // Destructure props
  const [firstPick, setFirstPick] = useState(defaultState);
  const [secondPick, setSecondPick] = useState(defaultState);
  const [remainingCards, setRemainingCards] = useState(deck);
  const [moves, setMoves] = useState(0);

  const handleClick = (index, value) => {
    // Selecting the first card or selecting the first card after a wrong pair match
    if (firstPick.index === null || (firstPick.index !== null && secondPick.index !== null)) {
      setSecondPick(defaultState);
      setFirstPick({ index, value });
      setMoves((moves) => moves + 1);
    }
    // Selecting the second card
    else if (secondPick.index === null && firstPick.index !== index) {
      setSecondPick({ index, value });
      setMoves((moves) => moves + 1);

      // Compare the two cards
      // If there is a match
      if (firstPick.value === value) {
        setRemainingCards(remainingCards.filter((card) => card !== value));
        setGamePoints((gamePoints) => gamePoints + 1); // Update points properly
      }
    }
  };

  return (
    <div className="cardgame-display">
      {deck.map((card, index) => {
        return (
          <div
            key={index}
            className={`cardgame-card 
              ${(firstPick.index === index || secondPick.index === index || !remainingCards.includes(card))
                && "cardgame-flipped"
              }`}
            onClick={() => handleClick(index, card)}
          >
            <div className="cardgame-card-back"></div>
            {card}
          </div>
        );
      })}
    </div>
  );
}

export default SinglePlayerCardGame;
