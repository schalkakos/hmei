import React, { useState } from "react";

import styles from "./Game.module.css";
import Gameplay from "./Gameplay/Gameplay";
import GameSetup from "./GameSetup/GameSetup";


const Game = (props) => {
  const [gamePhase, setGamePhase] = useState("setup");

  const changePhaseClickHandler = (value) => {
    
    setGamePhase(value);
  };

  const content =
    gamePhase === "setup" ? (
      <GameSetup
        changePhase={() => {
          changePhaseClickHandler("gameplay");
        }}
      />
    ) : (
      <Gameplay />
    );
  // console.log(content);
  return <div className={styles.GameWrapper}>{content}</div>;
};

export default Game;
