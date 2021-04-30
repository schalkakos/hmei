import React from "react";

import styles from "./Winner.module.css";
import { FaCrown } from "react-icons/fa";
import { IconContext } from "react-icons";

const Winner = (props) => {
  const { playerData } = props;
  console.log(playerData);

  return (
    <div className={[styles.WinnerWrapper, styles.ShowWinner].join(" ")}>
      <div className={styles.Crown}>
        <IconContext.Provider value={{ size: "100px" }}>
          <FaCrown />
        </IconContext.Provider>
      </div>
      <h1>{`${playerData.name} wins`}</h1>
    </div>
  );
};

export default Winner;
