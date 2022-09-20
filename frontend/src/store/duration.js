import { csrfFetch } from './csrf';

//Type Producer
const SET_DURATION = 'wave/SET_DURATION';
const REMOVE_WAVE = 'wave/REMOVE_WAVE'

//Action Creators
const setDurationAction = (payload) => {
    return {
      type: SET_DURATION,
      payload
    };
};

const removeWaveAction = () => {
  return {
    type: REMOVE_WAVE
  };
};

// Thunk - Set Song Progress
export const setDuration = (time) => async (dispatch) => {
    dispatch(setDurationAction(time));
};

// Thunk - Remove Song Wave
export const removeWave = () => async (dispatch) => {
  dispatch(removeWaveAction());
};


const durationReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_DURATION:
        return action.payload;
    case REMOVE_WAVE:
        return 0;
    default:
        return state;
  }
};

export default durationReducer;
