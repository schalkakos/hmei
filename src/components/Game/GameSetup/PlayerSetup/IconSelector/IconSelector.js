import React, { useState, useEffect } from "react";

import styles from "./IconSelector.module.css";
import PlayerIconDisplay from "../../../PlayerIconDisplay/PlayerIconDisplay";

const IconSelector = (props) => {
  const { value, selectorClicked, disabled, playerIcon, playerData } = props;
  const [iconValue, setIconValue] = useState(value);
  const [checked, setChecked] = useState(value === playerIcon);

  useEffect(() => {
    setIconValue(value);
    setChecked(value === playerIcon);
  }, [value, checked, playerIcon]);

  return (
    <div className={styles.IconSelectorWrapper}>
      <input
        type="radio"
        name={`icon ${playerData.id}`}
        value={iconValue}
        onClick={selectorClicked}
        disabled={disabled}
        defaultChecked={checked}
      />
      <PlayerIconDisplay icon={value} size="20px" />
    </div>
  );
};

export default IconSelector;
