import { csrfFetch } from './csrf';

//Type Producer
const GET_ONE_SONG = 'song/GET_ONE_SONG';
const REMOVE_SONG = 'song/REMOVE_SONG'

//Action Creators
const getOneSongAction = (payload) => {
    return {
      type: GET_ONE_SONG,
      payload
    };
};

const removeSongAction = () => {
  return {
    type: REMOVE_SONG
  };
};

// Thunk - Get one Song
export const getOneSong = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}`);
    const data = await response.json();
    dispatch(getOneSongAction(data));
    return response
};

// Thunk - Remove Song
export const removeSong = () => async (dispatch) => {
  dispatch(removeSongAction());
};

const initialState = {};

const songReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ONE_SONG:
        newState = {...action.payload};
        return newState;
    case REMOVE_SONG:
        return newState;
    default:
        return state;
  }
};

export default songReducer;
