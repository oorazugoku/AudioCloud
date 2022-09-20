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
export const setWaveSeek = (time) => async (dispatch) => {
    dispatch(setWaveSeekAction(time));
};

const waveSeekReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_WAVE_SEEK:
        return action.payload;
    default:
        return state;
  }
};

export default waveSeekReducer;
