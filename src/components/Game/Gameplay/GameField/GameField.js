import React, { useState, useEffect } from "react";

import styles from "./GameField.module.css";
import PlayerIconDisplay from "../../PlayerIconDisplay/PlayerIconDisplay";

const GameField = (props) => {
  const {
    fieldId,
    currentPlayerData,
    fieldClick,
    playerWon,
    resetGame,
  } = props;
  const [id] = useState(fieldId);
  const [clickedBy, setClickedBy] = useState(null);

  useEffect(() => {
    if (resetGame) {
      setClickedBy(null);
    }
  }, [resetGame]);

  const clickHandler = () => {
    if (clickedBy || playerWon) {
      return;
    }
    setClickedBy(currentPlayerData);
    fieldClick(id);
  };

  return (
    <div className={styles.FieldWrapper} onClick={clickHandler}>
      {clickedBy ? (
        <PlayerIconDisplay icon={clickedBy.icon} size="20px" />
      ) : (
        <PlayerIconDisplay icon={null} size="20px" />
      )}
    </div>
  );
};

export default GameField;
