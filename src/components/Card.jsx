import React from 'react';

import styles from 'Styles/card.module.css';

export default function Card({
  singleCard,
  handleChoice,
  isFlipped,
  isDisabled,
}) {
  function handleClick() {
    handleChoice(singleCard);
  }

  return (
    <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
      <img src={singleCard.src} alt='card front' className={styles.front} />
      <img
        src='/src/assets/img/cover.png'
        alt='card back'
        className={styles.back}
        onClick={!isDisabled ? handleClick : undefined}
      />
    </div>
  );
}
