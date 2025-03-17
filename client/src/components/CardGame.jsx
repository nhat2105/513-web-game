import React from 'react';

const items = [1,2,3,4,5];
const suits = ["♠", "♣", "♥", "♦"];

const deck = ([...suits, ...suits]);

const handleClick = () => {};

function CardGame() { 
  return (
    <div className='cardgame-display'>
      {deck.map((card, index) => {
        return ( 
          <div key={index} className='cardgame-card' onClick={handleClick}>
            <div className='cardgame-card-back'></div>
            {card}
          </div>
        )
      })}
    </div>
  );
}

export default CardGame;