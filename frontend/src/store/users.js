import { csrfFetch } from './csrf';

//Type Producer
const GET_USERS = 'users/GET_USERS';

//Action Creators
const getUsersAction = (payload) => {
  return {
    type: GET_USERS,
    payload
  };
};

// Thunk - Logout
export const getUsers = () => async (dispatch) => {
  const response = await csrfFetch('/api/users');
  const data = await response.json()
  dispatch(getUsersAction(data));
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_USERS:
      for (let user of action.payload) newState[user.id] = user
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
