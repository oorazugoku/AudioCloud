//Type Producer
const SET_DURATION = 'wave/SET_DURATION';

//Action Creators
const setDurationAction = (payload) => {
    return {
      type: SET_DURATION,
      payload
    };
};

// Thunk - Set Song Progress
export const setDuration = (time) => async (dispatch) => {
    dispatch(setDurationAction(time));
};



const durationReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_DURATION:
        return action.payload;
    default:
        return state;
  }
};

export default durationReducer;
