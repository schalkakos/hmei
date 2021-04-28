import React, { useState } from "react";

import styles from "./GameField.module.css";

const GameField = (props) => {
  const { fieldId, currentPlayerData, fieldClick } = props;
  const [ id ] = useState(fieldId);
  const [clickedBy, setClickedBy] = useState();

  

  // const player;
  const clickHandler = (id) => {
    setClickedBy(currentPlayerData);
    fieldClick(id)
  }

  return <div className={styles.FieldWrapper} onClick={clickHandler(id)}></div>;
};

export default GameField;
