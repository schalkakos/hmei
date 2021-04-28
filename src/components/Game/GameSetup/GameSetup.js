import React from "react";
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
  let availableIcons = [
    { icon: "circle", available: true },
    { icon: "cross", available: true },
    { icon: "triangle", available: true },
    { icon: "hexagon", available: true },
  ];

  availableIcons = availableIcons.map((iconValue) => {
    const isIconUsed = playersData.some((playerValue) => {
      if (playerValue.icon === iconValue.icon) {
        return true;
      }
      return false;
    });
    if (isIconUsed) {
      iconValue.available = false;
    }
    return iconValue;
  });

  // const BoardSizeKeyDownHandler = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // };

  const addNewPlayerClickHandler = () => {
    onAddPlayer();
  };

  const players = playersData.map((value, i) => {
    return (
      <PlayerSetup
        playerData={value}
        icons={availableIcons}
        key={i}
      />
    );
  });

  // console.log(players.length);
  if (players.length < 4) {
    players.push(
      <AddPlayerButton
        addNewPlayer={addNewPlayerClickHandler}
        key={players.length + 2}
      />
    );
  }

  // console.log(players);
  const selectOptions = [...Array(11)].map((value, index) => {
    return <option key={index}>{index + 10}</option>;
  });

  return (
    <div className={styles.SetUpWrapper}>
      <span>Set up the game</span>
      {/* <span>Set up the game</span> */}
      
      <div className={styles.PlayerWrapper}>
        {players}
        <Form onChange={(event) => onChangeMapSize(event.target.value)}>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>{`Board size: ${mapSize} x ${mapSize}`}</Form.Label>
            <Form.Control as="select" custom>
              {selectOptions}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <Button variant="success" onClick={changePhase}>
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
