import * as actionTypes from "./actionsTypes";

export const changeMapSize = (mapSize) => {
  return {
    type: actionTypes.CHANGE_MAP_SIZE,
    mapSize: mapSize,
  };
};

export const addPlayer = () => {
  return {
    type: actionTypes.ADD_PLAYER,
  };
};
