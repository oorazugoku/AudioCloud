import { csrfFetch } from './csrf';

//Type Producer
const GET_SONG_COMMENTS = 'comments/GET_SONG_COMMENTS';


//Action Creators
const getSongCommentsAction = (payload) => {
    return {
      type: GET_SONG_COMMENTS,
      payload
    };
};



// Thunk - Get Song Comments
export const getSongComments = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/songs/${id}`);
    const data = await response.json();
    dispatch(getSongCommentsAction(data));
    return response
};
