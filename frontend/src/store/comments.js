import { csrfFetch } from './csrf';

//Type Producer
const GET_SONG_COMMENTS = 'comments/GET_SONG_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT'


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



// Thunk - Post a Comment to a Song
export const addComment = (info) => async (dispatch) => {
    const { id } = info;
    const response = await csrfFetch(`/api/comments/songs/${id}`, {
        method: 'POST',
        body: JSON.stringify(info)
    });
    const data = await response.json();
    console.log(data)
    dispatch(addCommentAction(data));
    return response
};

// Thunk - Get Song Comments
export const getSongComments = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/songs/${id}`);
    const data = await response.json();
    dispatch(getSongCommentsAction(data));
    return response
};


const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case GET_SONG_COMMENTS:
          for (let each of action.payload) newState[each.id] = each
          return newState;
      default:
          return state;
    }
  };

  export default commentReducer;
