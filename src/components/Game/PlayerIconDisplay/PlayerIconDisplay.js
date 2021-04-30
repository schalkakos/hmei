import React from "react";

// import styles from './PlayerIconDisplay.module.css';
import { BsCircle, BsTriangle, BsStar } from "react-icons/bs";
// import { GrClose } from "react-icons/gr";
import { FiHexagon } from "react-icons/fi";
import { IconContext } from "react-icons";

const PlayerIconDisplay = (props) => {
  const { icon, size } = props;

  const playerIcon = () => {
    switch (icon) {
      case "star": {
        return (
          <IconContext.Provider value={{ size: size, color: "#000"}} >
            <BsStar />
          </IconContext.Provider>
        );
      }
      case "circle": {
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
        return null;
      }
    }
  };

  return (
    playerIcon()
    // <div></div>
  );
};

export default PlayerIconDisplay;
