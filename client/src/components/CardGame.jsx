import {useState, useRef} from 'react';

const values = ["♠", "♣", "♥", "♦", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J",];

//create a deck of cards and shuffle them
const deck = ([...values, ...values].sort(() => 0.5 - Math.random()));
const defaultState = {index: null, value: null};

function CardGame() { 
  const [firstPick, setFirstPick] = useState(defaultState);
  const [secondPick, setSecondPick] = useState(defaultState);
  const [remainingCards, setRemainingCards] = useState(deck);
  const [moves, setMoves] = useState(0);

  const handleClick = (index, value) => {
    //selecting the first card or selecting the first card after wrong pair match
    if (firstPick.index === null || (firstPick.index !== null && secondPick.index !== null)) {
      setSecondPick(defaultState);
      setFirstPick({index, value});
      setMoves((moves) => moves + 1);
    }
    //selecting the second card
    else if (secondPick.index === null && firstPick.index !== index) {
      setSecondPick({index, value});
      setMoves((moves) => moves + 1);

      //compare the two cards
      //if there is a pair
      if (firstPick.value === value) {
        setRemainingCards(remainingCards.filter((card) => card !== value));
      }
    }
  };

  return (
    <div className='cardgame-display'>
      {deck.map((card, index) => {
        return ( 
          <div 
            key={index} 
            className={`cardgame-card 
            ${(firstPick.index === index 
              || secondPick.index === index 
              || !remainingCards.includes(card)
            ) && "cardgame-flipped"
          }`}
           onClick={() => handleClick(index, card)}
           >
            <div className='cardgame-card-back'></div>
            {card}
          </div>
        )
      })}
    </div>
  );
}

export default CardGame;