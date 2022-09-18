import { csrfFetch } from './csrf';

//Type Producer
const SET_WAVE_SEEK = 'wave/SET_WAVE_SEEK';

//Action Creators
const setWaveSeekAction = (payload) => {
    return {
      type: SET_WAVE_SEEK,
      payload
    };
};


// Thunk - Set Wave Seek
export const setWaveSeek = (data) => async (dispatch) => {
    dispatch(setWaveSeekAction(data));
};

const initialstate = {};

const waveSeekReducer = (state = initialstate, action) => {
  let newState = {};
  switch (action.type) {
    case SET_WAVE_SEEK:
      newState = {...state}
      newState[action.payload.id] = action.payload
      return newState;
    default:
        return state;
  }
};

export default waveSeekReducer;
