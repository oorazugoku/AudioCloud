//Type Producer
const EDIT_SONG = 'song/EDIT_SONG';

//Action Creators
const editSongAction = (payload) => {
    return {
      type: EDIT_SONG,
      payload
    };
};

// Thunk - Edit a Song
export const editSong = (song) => async (dispatch) => {
    dispatch(editSongAction(song));
};

const initialState = {};

const editSongReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_SONG:
        return action.payload;
    default:
        return state;
  }
};

export default editSongReducer;
