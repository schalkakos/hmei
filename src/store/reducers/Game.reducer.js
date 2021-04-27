import * as actionTypes from "../actions/actionsTypes";
import update from "immutability-helper";

const initalStore = {
  mapSize: 10,
  playersData: [
    { name: "Player 1", shape: null },
    { name: "Player 2", shape: null },
  ],
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_MAP_SIZE: {
      const { mapSize } = action;
      return update(state, {
        mapSize: { $set: mapSize },
      });
    }
    case actionTypes.ADD_PLAYER: {
      return update(state, {
        playersData: {
          $push: [
            { name: `Player ${state.playersData.length + 1}`, shape: null }
          ],
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
