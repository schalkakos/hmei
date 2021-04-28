import React from "react";

import styles from "./AddPlayerButton.module.css";
import { BsPlus } from "react-icons/bs";
import { IconContext } from "react-icons";

const AddPlayerButton = (props) => {
  const {addNewPlayer} = props;
  return (
    <div className={styles.NewPlayerWrapper} onClick={addNewPlayer}>
      <IconContext.Provider value={{ size: "20px" }}>
        <BsPlus />
      </IconContext.Provider>
      <span>Add New Player</span>
    </div>
  );
};

export default AddPlayerButton;
