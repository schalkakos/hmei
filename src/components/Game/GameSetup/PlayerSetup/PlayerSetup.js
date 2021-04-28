import React, { useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../store/actions/Game.actions";
import { Form, FormControl } from "react-bootstrap";
// import { BsCircle, BsTriangle } from "react-icons/bs";
// import { GrClose } from "react-icons/gr";
// import { FiHexagon } from "react-icons/fi";
import styles from "./PlayerSetup.module.css";
import IconSelector from "./IconSelector/IconSelector";

const PlayerSetup = (props) => {
  const { icons, playerData, onChangeIcon, onChangeName } = props;
  const [playerName, setPlayerName] = useState(playerData.name);

  const formOnClickHandler = (event) => {
    onChangeIcon(event.target.value, playerData.id);
  };


  const options = icons.map((value, index) => {
    if (!value.available) {
      return (
        <IconSelector
          playerIcon={playerData.icon}
          disabled={true}
          selectorClicked={formOnClickHandler}
          value={value.icon}
          key={`${playerData.id}` + index}
        />
      );
    }
    return (
      <IconSelector
        selectorClicked={formOnClickHandler}
        value={value.icon}
        disabled={false}
        key={`${playerData.id}` + index}
      />
    );
  });

  return (
    <div className={styles.PlayerWrapper}>
      <FormControl
        value={playerName}
        onChange={(event) => setPlayerName(event.target.value)}
        onBlur={() => onChangeName(playerName, playerData.id)}
        onFocus={(event) => event.target.select()}
        className={styles.PlayerNameInput}
      />
      <Form>
        <div key={`inline-radio`} className={styles.Form}>
          {options}
        </div>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeIcon: (icon, playerId) => {
      dispatch(actions.changePlayerIcon(icon, playerId));
    },
    onChangeName: (newPlayerName, playerId) => {
      dispatch(actions.changePlayerName(newPlayerName, playerId))
    }
  };
};

export default connect(null, mapDispatchToProps)(PlayerSetup);
