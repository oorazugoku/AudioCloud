//Type Producer
const PLAYING = 'song/PLAYING';

//Action Creators
const setPlayingAction = (payload) => {
    return {
      type: PLAYING,
      payload
    };
};

// Thunk - Set Song Playing
export const setPlaying = (data) => async (dispatch) => {
    dispatch(setPlayingAction(data));
};


const playingReducer = (state = false, action) => {
  switch (action.type) {
    case PLAYING:
        const newState = action.payload;
        return newState;
    default:
        return state;
  }
};

export default playingReducer;
