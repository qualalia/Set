import history from "../history";
const axios = require("axios");
const { red } = require("chalk");

const SET_GAME = "SET_GAME";
const initialState = {};
const setGame = game => ({ type: SET_GAME, game });

export const newGame = () => async dispatch => {
  try {
    const { data } = await axios.post("/api/games/new");
    dispatch(setGame(data));
    history.push(`/play/${data.code}`);
  } catch (err) {
    console.error(red(err));
  }
};

export const getGame = code => async dispatch => {
  try {
    const { data } = await axios.get(`/api/games/${code}`);
    dispatch(setGame(data));
    history.push(`/play/${code}`);
  } catch (err) {
    console.error(red(err));
  }
};

export const updateGame = (theSet, playerId, gameId) => async dispatch => {
  try {
    const { data } = await axios.put(
      `/api/games/${gameId}/player/${playerId}/update-board`,
      theSet,
    );
    dispatch(setGame(data));
  } catch (err) {
    console.error(red(err));
  }
};

export const stumped = gameId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/games/${gameId}/stumped`);
    dispatch(setGame(data));
  } catch (err) {
    console.error(red(err));
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GAME:
      return action.game;
    default:
      return state;
  }
}
