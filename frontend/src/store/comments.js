import { csrfFetch } from './csrf';

//Type Producer
const GET_SONG_COMMENTS = 'comments/GET_SONG_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';


//Action Creators
const getSongCommentsAction = (payload) => {
    return {
      type: GET_SONG_COMMENTS,
      payload
    };
};

const addCommentAction = (payload) => {
    return {
      type: CREATE_COMMENT,
      payload
    };
};

const editCommentAction = (payload) => {
    return {
      type: EDIT_COMMENT,
      payload
    };
};

const deleteCommentAction = (payload) => {
    return {
      type: DELETE_COMMENT,
      payload
    };
};

// Thunk - Post a Comment to a Song
export const addComment = (info) => async (dispatch) => {
    const { id } = info;
    const response = await csrfFetch(`/api/comments/songs/${id}`, {
        method: 'POST',
        body: JSON.stringify(info)
    });
    const data = await response.json();
    dispatch(addCommentAction(data));
    return response
};

// Thunk - Edit a Comment
export const editComment = (info) => async (dispatch) => {
    const { id } = info;
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(info)
    });
    const data = await response.json();
    dispatch(editCommentAction(data));
    return response
};

// Thunk - Get Song Comments
export const getSongComments = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/songs/${id}`);
    const data = await response.json();
    dispatch(getSongCommentsAction(data));
    return response
};

// Thunk - Delete a Comment
export const deleteComment = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE'
    });
    dispatch(deleteCommentAction(id));
    return response
};

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_SONG_COMMENTS:
            for (let each of action.payload) newState[each.id] = each
            return newState;
        case EDIT_COMMENT:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_COMMENT:
            newState = {...state}
            delete newState[action.payload]
            return newState;
      default:
          return state;
    }
  };

  export default commentReducer;
