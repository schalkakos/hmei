import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../store/actions/Game.actions";
import { FormControl } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";
import styles from "./PlayerSetup.module.css";
import IconSelector from "./IconSelector/IconSelector";

const PlayerSetup = (props) => {
  const {
    icons,
    playerData,
    onChangeIcon,
    onChangeName,
    deletable,
    onRemovePlayer,
  } = props;

  const [playerName, setPlayerName] = useState(playerData.name);

  useEffect(() => {
    setPlayerName(playerData.name);
  }, [playerData.name]);

  const formOnClickHandler = (event) => {
    onChangeIcon(event.target.value, playerData.id);
  };

  const options = icons.map((value, index) => {
    return !value.available ? (
      <IconSelector
        playerIcon={playerData.icon}
        playerData={playerData}
        disabled={true}
        selectorClicked={formOnClickHandler}
        value={value.icon}
        key={`${playerData.id}` + index}
      />
    ) : (
      <IconSelector
        selectorClicked={formOnClickHandler}
        playerData={playerData}
        playerIcon={playerData.icon}
        value={value.icon}
        disabled={false}
        key={`${playerData.id}` + index}
      />
    );
  });

  const deleteButton = (
    <div
      className={styles.RemovePlayer}
      onClick={() => onRemovePlayer(playerData.id)}
    >
      <IconContext.Provider value={{ size: "20px" }}>
        <GrClose />
      </IconContext.Provider>
    </div>
  );

  return (
    <div className={styles.PlayerWrapper}>
      <FormControl
        value={playerName}
        onChange={(event) => setPlayerName(event.target.value)}
        onBlur={() => onChangeName(playerName, playerData.id)}
        onFocus={(event) => event.target.select()}
        className={styles.PlayerNameInput}
      />
      <div key={`inline-radio`} className={styles.Form}>
        {options}
      </div>
      {deletable ? deleteButton : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeIcon: (icon, playerId) => {
      dispatch(actions.changePlayerIcon(icon, playerId));
    },
    onChangeName: (newPlayerName, playerId) => {
      dispatch(actions.changePlayerName(newPlayerName, playerId));
    },
    onRemovePlayer: (playerId) => {
      dispatch(actions.removePlayer(playerId));
    },
  };
};

export default connect(null, mapDispatchToProps)(PlayerSetup);
