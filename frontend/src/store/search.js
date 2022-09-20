//Type Producer
const SEARCH = 'search/SEARCH';


//Action Creators
const searchOptionsAction = (payload) => {
    return {
      type: SEARCH,
      payload
    };
};

// Thunk - Initialize Search Options
export const searchOptions = (data) => async (dispatch) => {
    dispatch(searchOptionsAction(data));
};


const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
        return action.payload;
    default:
        return state;
  }
};

export default searchReducer;
