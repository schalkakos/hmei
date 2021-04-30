import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./Gameplay.module.css";
import { Button } from "react-bootstrap";
import GameField from "./GameField/GameField";
import PlayerIconDisplay from "../PlayerIconDisplay/PlayerIconDisplay";
import Winner from "./Winner/Winner";

const Gameplay = (props) => {
  const { mapSize, playersData, changePhase } = props;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentPlayerData, setCurrentPlayer] = useState(
    playersData[currentPlayerIndex]
  );
  const [resetGame, setResetGame] = useState(false);
  const [playerScore, setPlayerScore] = useState(() => {
    return playersData.map(() => {
      return [];
    });
  });
  const [playerWon, setPlayerWon] = useState(null);
  const [possibleIconLocations] = useState([
    1,
    mapSize - 1,
    mapSize,
    mapSize + 1,
  ]);
  console.log(possibleIconLocations)
  console.log(typeof mapSize)

  useEffect(() => {
    if (resetGame) {
      setResetGame(false);
    }
  }, [resetGame]);

  const checkWinCondition = (updatedPlayerScore) => {
    if (updatedPlayerScore.length < 5) {
      return false;
    }

    const sortedPlayerScore = updatedPlayerScore.sort((a, b) => a - b);

    const isCurrentPlayerWinner = sortedPlayerScore.some(
      (playerScoreValue, index) => {
        if (sortedPlayerScore.length - index < 5) {
          return false;
        }

        return possibleIconLocations.some((possibleLocationValue) => {
          let direction = 0;
          let counter = 0;

          const foundDirection = sortedPlayerScore.find((resultValue) => {
            return resultValue === playerScoreValue + possibleLocationValue
              ? true
              : false;
          });

          if (foundDirection !== undefined) {
            counter = counter + 1;
            direction = possibleLocationValue;
            for (let i = counter; i <= 4; i++) {
              let numberToLookFor = playerScoreValue + i * direction;
              const foundNextValue = sortedPlayerScore.find((resultValue) => {
                return resultValue === numberToLookFor ? true : false;
              });

              if (!foundNextValue) {
                return false;
              }
            }
            return true;
          }
          return false;
        });
      }
    );
    return isCurrentPlayerWinner ? true: false;
  };

  const changePlayerTurnClickHandler = (id) => {
    const newPlayerScore = [...playerScore];
    const newCurrentPlayerScore = [...playerScore[currentPlayerIndex], id];
    newPlayerScore[currentPlayerIndex] = newCurrentPlayerScore;
    setPlayerScore(newPlayerScore);
    if (checkWinCondition(newCurrentPlayerScore)) {
      setPlayerWon(currentPlayerData);
      return;
    }

    let nextPlayerIndex = currentPlayerIndex + 1;
    if (nextPlayerIndex > playersData.length - 1) {
      nextPlayerIndex = 0;
    }
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentPlayer(playersData[nextPlayerIndex]);
  };

  const resetGameClickHandler = () => {
    const updatedPlayerScore = playersData.map(() => []);
    setPlayerScore(updatedPlayerScore);
    setPlayerWon(null);
    setCurrentPlayer(playersData[0]);
    setCurrentPlayerIndex(0);
    setResetGame(true);
  };

  const playingField = (() => {
    return [...Array(mapSize * mapSize)].map((_, index) => {
      return (
        <GameField
          playerWon={playerWon}
          resetGame={resetGame}
          fieldId={index}
          key={index}
          currentPlayerData={currentPlayerData}
          fieldClick={changePlayerTurnClickHandler}
        />
      );
    });
  })();

  return (
    <div className={styles.GameplayWrapper}>
      <div className={styles.Title}>
        <span>{`${currentPlayerData.name}'s turn`}</span>
        <span>
          with icon: <PlayerIconDisplay icon={currentPlayerData.icon} size="20px"/>
        </span>
      </div>
      <div
        className={styles.GameFieldWrapper}
        style={{
          width: 31 * mapSize + 1,
          height: 31 * mapSize + 1,
        }}
      >
        {playingField}
      </div>
      <div className={styles.GamePlayActions}>
        <Button variant="success" onClick={resetGameClickHandler}>
          Reset Game
        </Button>
        <Button variant="success" onClick={changePhase}>
          Back to settings
        </Button>
      </div>
      {playerWon ? <Winner playerData={playerWon} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mapSize: state.mapSize,
    playersData: state.playersData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
