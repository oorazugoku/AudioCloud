//Type Producer
const GET_SONG = 'comments/GET_SONG';

//Action Creators
const getSongFromCommentsAction = (payload) => {
    return {
      type: GET_SONG,
      payload
    };
};

// Thunk - Get Song Comments
export const getSongFromComments = (data) => async (dispatch) => {
    dispatch(getSongFromCommentsAction(data));
};


const initialState = {};

const songCommentsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case GET_SONG:
          newState = action.payload
          return newState;
      default:
          return state;
    }
  };

  export default songCommentsReducer;
