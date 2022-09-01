import { csrfFetch } from './csrf';

//Type Producer
const GET_ONE_SONG = 'songs/GET_ONE_SONG';

//Action Creators
const getOneSongAction = (payload) => {
    return {
      type: GET_ONE_SONG,
      payload
    };
};

// Thunk - Get one Song
export const getOneSong = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}`);
    const data = await response.json();
    dispatch(getOneSongAction(data));
    return response
};

const initialState = { user: null };

const songReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SONGS:
        newState = {...action.payload};
        return newState;
    default:
        return state;
  }
};

export default songReducer;
