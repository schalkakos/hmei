import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/Game.actions";

import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BsCircle, BsTriangle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { FiHexagon } from "react-icons/fi";
import styles from "./GameSetup.module.css";
import PlayerSetup from "./PlayerSetup/PlayerSetup";
import AddPlayerButton from "./PlayerSetup/AddPlayerButton/AddPlayerButton";

const GameSetup = (props) => {
  const { changePhase, mapSize, playersData, onChangeMapSize, onAddPlayer } = props;
  // const [playerCount, setPlayerCount] = useState(2);
  const [availableIcons, setAvailableIcons] = useState([
    { shape: "circle", available: true, component: <BsCircle /> },
    { shape: "cross", available: true, component: <GrClose /> },
    { shape: "triangle", available: true, component: <BsTriangle /> },
    { shape: "hexagon", available: true, component: <FiHexagon /> },
  ]);

  const BoardSizeKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  const addNewPlayerClickHandler = () => {
    onAddPlayer();
  };

  const players = playersData.map((value, i) => {
    // console.log(i);
    return (
      <PlayerSetup
        name={value.name}
        shape={value.shape}
        icons={availableIcons}
        setIcons={setAvailableIcons}
        playerPosition={i + 1}
        key={i}
      />
    );
  });


  console.log(players.length);
  if (players.length < 4) {
    players.push(
      <AddPlayerButton
        addNewPlayer={addNewPlayerClickHandler}
        key={players.length + 2}
      />
    );
  }

  // console.log(players);

  return (
    <div className={styles.SetUpWrapper}>
      <span>Set up the game</span>
      <div className={styles.PlayerWrapper}>
        {players}

        {/* <input type="number"></input> */}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>{`${mapSize} x ${mapSize}`}</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onBlur={(event) => {
              onChangeMapSize(event.target.value);
            }}
            onKeyDown={BoardSizeKeyDownHandler}
            placeholder="Board size(default is 10)"
            aria-label="Board size(default is 10)"
          />
        </InputGroup>
        <Button variant="success" onClick={changePhase}>
          Start Game
        </Button>
      </div>
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
