import { csrfFetch } from './csrf';

//Type Producer
const GET_SONGS = 'songs/GET_SONGS';
const CREATE_SONG = 'songs/CREATE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';

//Action Creators
const getSongsAction = (payload) => {
    return {
        type: GET_SONGS,
        payload
  };
};

const createSongAction = (payload) => {
  return {
      type: CREATE_SONG,
      payload
};
};

const editSongAction = (payload) => {
    return {
      type: EDIT_SONG,
      payload
    };
};

const deleteSongAction = (id) => {
    return {
      type: DELETE_SONG,
      id
    };
};

// Thunk - Get all Songs
export const getSongs = () => async (dispatch) => {
  const response = await csrfFetch("/api/songs");
  const data = await response.json();
  dispatch(getSongsAction(data.result));
  return response;
};

// Thunk - Create a Song
export const createSong = (info) => async (dispatch) => {
  const { title, description, id, imageURL } = info;
  const response = await csrfFetch(`/api/songs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          title,
          description,
          imageURL
      }),
  });
  const data = await response.json();
  dispatch(createSongAction(data));
  return response
};

// Thunk - Edit a Song
export const editSong = (info) => async (dispatch) => {
    const { title, description, id, imageURL } = info;
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            imageURL
        }),
    });
    const data = await response.json();
    dispatch(editSongAction(data.result));
    return response
};

// Thunk - Delete a Song
export const deleteSong = (id) => async (dispatch) => {
  await csrfFetch(`/api/songs/${id}`, {
    method: 'DELETE'
  });
  dispatch(deleteSongAction(id));
};



const initialState = { user: null };

const songsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SONGS:
        for (let each of action.payload) newState[each.id] = each;
        return newState;
    case EDIT_SONG:
        newState = {...state}
        newState[action.payload.id] = action.payload;
        return newState;
    case DELETE_SONG:
        newState = {...state}
        delete newState[action.id]
        return newState;
    default:
        return state;
  }
};

export default songsReducer;
