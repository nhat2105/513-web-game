import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

function shuffleArray(array){
    for (var i = array.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const GamePlay = () => {
    const numberOfPairs = 8;
    const [flippedCards, setFlippedCards] = useState([]);
    const [shuffledArray, setShuffled] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);

    useEffect(() => {
        const shuffled = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        shuffleArray(shuffled)
        setShuffled(shuffled);
    }, [])

    // Check card matched
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstIndex, secondIndex] = flippedCards;
            const timeoutId = setTimeout(() => {
                setFlippedCards([]);
                if (shuffledArray[firstIndex] === shuffledArray[secondIndex]) {
                    const newMatched = [...matchedPairs, shuffledArray[firstIndex]]
                    setMatchedPairs(newMatched);
                }
            }, 1000); // Delay of 1 second before checking for match

            return () => clearTimeout(timeoutId); //clear timeout
        }
    }, [flippedCards, shuffledArray, matchedPairs]);

    function handleClick(index){
        if (flippedCards.length === 2)return;
        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);
    }

    return(
        <div>
            <h1>Numbers of Pairs Left: {numberOfPairs - matchedPairs.length}</h1>
            <h1>Matched Pairs: {matchedPairs}</h1>
            { numberOfPairs - matchedPairs.length === 0 ? <h2>You Win!</h2> : null}
            <div className="card-grid">
                {shuffledArray.map((value, index) => (
                    <div>
                        <Card key={index} 
                            id={value} 
                            value={value}
                            isClicked={flippedCards.includes(index)}
                            onClickF={() => handleClick(index)}
                            matched={matchedPairs.includes(value)} />
                    </div>
                ))

            }

            </div>
        </div>
    )
}

export default GamePlay;