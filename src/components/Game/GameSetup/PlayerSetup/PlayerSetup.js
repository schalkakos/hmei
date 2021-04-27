import React, { useState } from "react";

import { Form, FormControl } from "react-bootstrap";
import { BsCircle, BsTriangle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { FiHexagon } from "react-icons/fi";
import styles from "./PlayerSetup.module.css";

const PlayerSetup = (props) => {
  const { playerPosition, icons, setIcons } = props;
  // const [availableIcons, setAvailableIcons] = useState([
  //   { shape: "circle", available: true, component: <BsCircle /> },
  //   { shape: "cross", available: true, component: <GrClose /> },
  //   { shape: "triangle", available: true, component: <BsTriangle /> },
  //   { shape: "hexagon", available: true, component: <FiHexagon /> },
  // ]);
  const [playerName, setPlayerName] = useState(`Player ${playerPosition}`);

  const formOnChange = (event) => {
    const newIcons = icons.map((value, index) => {
      if (value.shape === event.target.name) {
        value.available = false;
      }
      console.log(value);
      return value;
    });
    setIcons(newIcons);
  };

  // const disablePickedOption = (event) => {};

  const options = icons.map((value, index) => {
    if (!value.available) {
      return (
        <Form.Check
          onChange={formOnChange}
          inline
          disabled
          label={value.component}
          name={value.shape}
          type="checkbox"
          key={index}
        />
      );
    }
    return (
      <Form.Check
        onChange={formOnChange}
        inline
        label={value.component}
        name={value.shape}
        type="checkbox"
        key={index}
      />
    );
  });

  // console.log(options)

  return (
    <div className={styles.PlayerWrapper}>
      {/* <input
        value={playerName}
        onChange={(event) => {
          setPlayerName(event.target.value);
        }}
      ></input> */}
      <FormControl
        value={playerName}
        onChange={(event) => {
          setPlayerName(event.target.value);
        }}
        className={styles.PlayerNameInput}
      />
      <Form>
        {["checkbox"].map((type) => {
          return (
            <div key={`inline-${type}`} className={styles.Form}>
              {options}
            </div>
          );
        })}
      </Form>
    </div>
  );
};

export default PlayerSetup;
