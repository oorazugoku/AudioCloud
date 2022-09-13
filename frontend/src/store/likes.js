import { csrfFetch } from './csrf';

//Type Producer
const GET_ALL_LIKES = 'likes/GET_ALL_LIKES';
const LIKE_SONG = 'likes/LIKE_SONG';
const UNLIKE_SONG = 'likes/UNLIKE_SONG';

//Action Creators
const getAllLikesAction = (payload) => {
    return {
      type: GET_ALL_LIKES,
      payload
    };
};

const likeSongAction = (payload) => {
    return {
      type: LIKE_SONG,
      payload
    };
};

const unlikeSongAction = (payload) => {
    return {
      type: UNLIKE_SONG,
      payload
    };
};

// Thunk - Get all song likes
export const getAllLikes = () => async (dispatch) => {
    const response = await csrfFetch(`/api/likes`);
    const data = await response.json();
    dispatch(getAllLikesAction(data));
    return response
};

// Thunk - Create a Like by SongId
export const likeSong = (songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/song/${songId}`, {
        method: 'POST'
    });
    const data = await response.json();
    dispatch(likeSongAction(data));
    return response
};

// Thunk - Unlike a Song
export const unlikeSong = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/song/${id}`, {
        method: 'DELETE'
    });
    dispatch(unlikeSongAction(id));
    return response
};


const initialState = {};

const likesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_LIKES:
        for (let each of action.payload) {
            newState[each.songId] = each
        }
        return newState;
    case LIKE_SONG:
        newState = {...state}
        newState[action.payload.songId] = action.payload
        return newState
    case UNLIKE_SONG:
        newState = {...state}
        delete newState[action.payload]
        return newState
    default:
        return state;
  }
};

export default likesReducer;
