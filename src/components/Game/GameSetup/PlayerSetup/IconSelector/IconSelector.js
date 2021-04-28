import React, { useState } from "react";

import styles from "./IconSelector.module.css";
import { BsCircle, BsTriangle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { FiHexagon } from "react-icons/fi";
import { IconContext } from "react-icons";

const IconSelector = (props) => {
  const { value, selectorClicked, disabled, playerIcon} = props;
  const [checked] = useState(value === playerIcon);
  // console.log(value === playerIcon);
  // console.log(checked);
  // console.log(disabled);
  // console.log("-")

  const icon = () => {
    switch (value) {
      case "circle": {
        return (
          <IconContext.Provider value={{ size: "20px" }}>
            <GrClose />
          </IconContext.Provider>
        );
      }
      case "cross": {
        return (
          <IconContext.Provider value={{ size: "20px" }}>
            <BsCircle />
          </IconContext.Provider>
        );
      }
      case "triangle": {
        return (
          <IconContext.Provider value={{ size: "20px" }}>
            <BsTriangle />
          </IconContext.Provider>
        );
      }
      case "hexagon": {
        return (
          <IconContext.Provider value={{ size: "20px" }}>
            <FiHexagon />
          </IconContext.Provider>
        );
      }
      default: {
        return (
          <IconContext.Provider value={{ size: "20px" }}>
            <BsCircle />
          </IconContext.Provider>
        );
      }
    }
  };

  return (
    <div className={styles.IconSelectorWrapper}>
      <input
        type="radio"
        name="icons"
        value={value}
        onClick={selectorClicked}
        disabled={disabled}
        defaultChecked={checked}
      />
      {icon()}
    </div>
  );
};

export default IconSelector;
