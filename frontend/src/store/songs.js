import { csrfFetch } from './csrf';

//Type Producer
const GET_SONGS = 'songs/GET_SONGS';
const CREATE_SONG = 'songs/CREATE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';

const GET_SONG_COMMENTS = 'comments/GET_SONG_COMMENTS';

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

const getSongCommentsAction = (payload) => {
  return {
    type: GET_SONG_COMMENTS,
    payload
  };
};

// Thunk - Get all Songs
export const getSongs = (search) => async (dispatch) => {
  let response;
  search ? response = await csrfFetch(`/api/songs?search=${search}`) : response = await csrfFetch(`/api/songs`);
  const data = await response.json();
  dispatch(getSongsAction(data.result));
  return response;
};

// Thunk - Create a Song
export const createSong = (info) => async (dispatch) => {
  const { title, description, files } = info;

  const formData = new FormData();
  formData.append('title', title)
  formData.append('description', description)
  if (files && files.length !== 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  }

  const response = await csrfFetch(`/api/songs`, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
  });
  const data = await response.json();
  dispatch(createSongAction(data));
  return response
};

// Thunk - Edit a Song
export const editSong = (info) => async (dispatch) => {
    const { title, description, id } = info;
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description
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


const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SONGS:
        for (let each of action.payload) newState[each.id] = each;
        return newState;
    case CREATE_SONG:
        newState = {...state}
        newState[action.payload.id] = action.payload;
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
