import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Card from 'Components/Card';

import 'Styles/App.css';

// Create the array of cards
const cardImages = [
  { src: '/src/assets/img/potion-1.png', matched: false },
  { src: '/src/assets/img/helmet-1.png', matched: false },
  { src: '/src/assets/img/ring-1.png', matched: false },
  { src: '/src/assets/img/scroll-1.png', matched: false },
  { src: '/src/assets/img/shield-1.png', matched: false },
  { src: '/src/assets/img/sword-1.png', matched: false },
];

function App() {
  // State
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // Shuffle cards on load and start game
  useEffect(() => {
    shuffleCards();
  }, []);

  // Compare the chosen cards only if choiceTwo != null
  useEffect(() => {
    if (choiceTwo) {
      setDisabled(true);
      checkIfMatch() && changeCardMatchProp();
      setTimeout(() => endTurn(), 1000);
    }
  }, [choiceTwo]);

  // Generate the cards and shuffle them
  function shuffleCards() {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort((card) => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4() }));

    setCards(shuffledCards);

    // Reset the turns and choices
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  // Update card choice state
  function handleChoice(card) {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
  }

  // Check if choices match and handle it
  function checkIfMatch() {
    if (choiceOne.src === choiceTwo.src) {
      return true;
    }

    return false;
  }

  // Change "matched" property on matching cards to true
  function changeCardMatchProp() {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.src === choiceTwo.src) {
          return { ...card, matched: true };
        } else {
          return card;
        }
      });
    });
  }

  // Reset choices and increment turn
  function endTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className='App'>
      <header>
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>
      </header>

      <div className='card-grid'>
        {cards.map((card) => (
          <Card
            singleCard={card}
            handleChoice={handleChoice}
            isFlipped={card === choiceOne || card === choiceTwo || card.matched}
            isDisabled={disabled}
            key={card.id}
          />
        ))}
      </div>
      <p>Turn: {turns}</p>
    </div>
  );
}

export default App;
