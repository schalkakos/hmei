export const getPlayerIndex = (state, playerId) => {
  return state.playersData.findIndex((value) => {
    return value.id === playerId;
  });
}