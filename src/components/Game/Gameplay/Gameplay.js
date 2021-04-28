import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "./Gameplay.module.css";
import { Button } from "react-bootstrap";
import GameField from "./GameField/GameField";

const Gameplay = (props) => {
  const { mapSize, playersData, isGameOver } = props;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentPlayerData, setCurrentPlayer] = useState(
    playersData[currentPlayerIndex]
  );
  const [resetGame, setResetGame] = useState(false);
  // const [playerOrder] = useState(() => {
  //   return [...Array(playersData.length)].map((_, index) => {
  //     return index + 1;
  //   });
  // });
  // console.log(playersData[currentPlayerIndex])

  const checkWinCondition = () => {
    if (isGameOver || currentPlayerData.fields.length < 5) {
      return;
    }
  };

  const changePlayerTurnClickHandler = () => {
    checkWinCondition();

    let nextPlayerIndex = currentPlayerIndex + 1;
    if (nextPlayerIndex > playersData.length - 1) {
      nextPlayerIndex = 0;
    }
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentPlayer(playersData[nextPlayerIndex]);
  };

  const playingField = [...Array(mapSize * mapSize)].map((_, index) => {
    return (
      <GameField
        resetGame={resetGame}
        fieldId={index}
        key={index}
        currentPlayerData={currentPlayerData}
        fieldClick={changePlayerTurnClickHandler}
      />
    );
  });

  return (
    <div className={styles.GameplayWrapper}>
      <span>{`${currentPlayerData.name}'s turn`}</span>
      <div
        className={styles.GameFieldWrapper}
        style={{
          width: 30 * mapSize + 1,
          height: 30 * mapSize + 1,
        }}
      >
        {playingField}
      </div>
      <div className={styles.GamePlayActions}>
        <Button variant="success" onClick={changePlayerTurnClickHandler}>
          Reset Game
        </Button>
        <Button variant="success">Back to settings</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mapSize: state.mapSize,
    playersData: state.playersData,
    isGameOver: state.isGameOver,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
