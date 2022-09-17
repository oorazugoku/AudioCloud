import { csrfFetch } from './csrf';

//Type Producer
const SET_WAVE = 'wave/SET_WAVE';
const REMOVE_WAVE = 'wave/REMOVE_WAVE'

//Action Creators
const setWaveAction = (payload) => {
    return {
      type: SET_WAVE,
      payload
    };
};

const removeWaveAction = () => {
  return {
    type: REMOVE_WAVE
  };
};

// Thunk - Get one Song
export const setWave = (wave) => async (dispatch) => {
    dispatch(setWaveAction(wave));
};

// Thunk - Remove Song
export const removeWave = () => async (dispatch) => {
  dispatch(removeWaveAction());
};

const initialState = null;

const waveReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_WAVE:
        return action.payload;
    case REMOVE_WAVE:
        return newState;
    default:
        return state;
  }
};

export default waveReducer;
