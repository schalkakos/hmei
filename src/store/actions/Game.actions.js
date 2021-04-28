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

export const changePlayerIcon = (icon, playerId) => {
  return {
    type: actionTypes.CHANGE_PLAYER_ICON,
    icon: icon,
    playerId: playerId,
  };
};

export const changePlayerName = (newPlayerName, playerId) => {
  return {
    type: actionTypes.CHANGE_PLAYER_NAME,
    newPlayerName: newPlayerName,
    playerId: playerId,
  };
};

export const savePlayerMove = (fieldId, playerId) => {
  return {
    type: actionTypes.SAVE_PLAYER_MOVE,
    fieldId: fieldId,
    playerId: playerId,
  };
};
