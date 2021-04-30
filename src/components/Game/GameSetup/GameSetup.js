import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/Game.actions";

import { Button, Form } from "react-bootstrap";
import styles from "./GameSetup.module.css";
import PlayerSetup from "./PlayerSetup/PlayerSetup";
import AddPlayerButton from "./AddPlayerButton/AddPlayerButton";

const GameSetup = (props) => {
  const {
    changePhase,
    mapSize,
    playersData,
    onChangeMapSize,
    onAddPlayer,
  } = props;
  const [iconError, setIconError] = useState(false);
  const [availableIcons, setAvailableIcons] = useState([
    { icon: "circle", available: true },
    { icon: "star", available: true },
    { icon: "triangle", available: true },
    { icon: "hexagon", available: true },
  ]);

  useEffect(() => {
    setAvailableIcons((prevAvailableIcons) => {
      return prevAvailableIcons.map((iconValue) => {
        const updatedIconValue = { ...iconValue };
        const isIconUsed = playersData.some((playerValue) => {
          if (playerValue.icon === updatedIconValue.icon) {
            return true;
          }
          return false;
        });

        if (isIconUsed) {
          updatedIconValue.available = false;
        } else {
          updatedIconValue.available = true;
        }
        return updatedIconValue;
      });
    });
  }, [playersData]);


  const StartButtonClickHandler = () => {
    const playersChoseIcon = playersData.every((value) => {
      return value.icon ? true : false;
    });

    if (playersChoseIcon) {
      changePhase();
    } else {
      setIconError(true);
    }
  };

  const players = playersData.map((value, i) => {
    const deletable = i > 1;
    return (
      <PlayerSetup
        playerData={value}
        icons={availableIcons}
        key={i}
        deletable={deletable}
      />
    );
  });

  if (players.length < 4) {
    players.push(
      <AddPlayerButton
        addNewPlayer={onAddPlayer}
        key={players.length + 2}
      />
    );
  }

  const selectOptions = [...Array(11)].map((_, index) => {
    return <option key={index}>{index + 10}</option>;
  });

  return (
    <div className={styles.SetUpWrapper}>
      <div className={styles.Title}>
        <span>Set up the game</span>
        {iconError ? <span>All players must chose an icon</span> : null}
      </div>

      {/* <span>Set up the game</span> */}

      <div className={styles.PlayerWrapper}>
        {players}
        <Form onChange={(event) => onChangeMapSize(+event.target.value)}>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>{`Board size: ${mapSize} x ${mapSize}`}</Form.Label>
            <Form.Control as="select" custom>
              {selectOptions}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <Button variant="success" onClick={StartButtonClickHandler}>
        Start Game
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playersData: state.playersData,
    mapSize: state.mapSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeMapSize: (mapSize) => {
      dispatch(actions.changeMapSize(mapSize));
    },
    onAddPlayer: () => {
      dispatch(actions.addPlayer());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSetup);
