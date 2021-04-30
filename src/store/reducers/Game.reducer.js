import * as actionTypes from "../actions/actionsTypes";
import update from "immutability-helper";
import { getPlayerIndex } from '../uitls';

const initalStore = {
  mapSize: 10,
  playersData: [
    { id: 1, name: "Player 1", icon: null },
    { id: 2, name: "Player 2", icon: null }
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
      const nextPlayerPosition = state.playersData.length + 1;

      return update(state, {
        playersData: {
          $push: [
            {
              id: nextPlayerPosition,
              name: `Player ${nextPlayerPosition}`,
              icon: null
            },
          ],
        },
      });
    }
    case actionTypes.CHANGE_PLAYER_ICON: {
      const { icon, playerId } = action;
      const playerIndex = getPlayerIndex(state, playerId);

      return update(state, {
        playersData: {
          [playerIndex]: {
            icon: { $set: icon },
          },
        },
      });
    }
    case actionTypes.CHANGE_PLAYER_NAME: {
      const { newPlayerName, playerId } = action;

      const playerIndex = getPlayerIndex(state, playerId);

      return update(state, {
        playersData: {
          [playerIndex]: {
            name: { $set: newPlayerName },
          },
        },
      });
    }
    case actionTypes.REMOVE_PLAYER: {
      const { playerId } = action;

      const playerIndex = getPlayerIndex(state, playerId);
      
      return update(state, {
        playersData: {
          $splice: [[playerIndex, 1]],
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
