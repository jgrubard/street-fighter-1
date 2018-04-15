import axios from 'axios';
import { GET_PLAYERS, CREATE_PLAYER } from './actionTypes';

export const getPlayersThunk = () => {
  return dispatch => {
    return axios.get('/api/players')
      .then(res => res.data)
      .then(players => dispatch({ type: GET_PLAYERS, players }))
      .catch(err => console.error(err));
  };
};

export const createPlayerThunk = (player) => {
  return dispatch => {
    return axios.post('/api/players', player)
      .then(res => res.data)
      .then(player => dispatch({ type: CREATE_PLAYER, player }))
      .catch(err => console.error(err));
  };
};

const playersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PLAYERS:
      state = action.players;
      break;
    case CREATE_PLAYER:
      state = [ ...state, action.player ];
  }
  return state;
}

export default playersReducer;
