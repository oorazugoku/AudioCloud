import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import songs from './songs';
import song from './song';
import users from './users';
import playing from './playing';
import comments from './comments';
import songComments from './songComments';
import likes from './likes';
import wave from './wave';
import duration from './duration'


const rootReducer = combineReducers({
  session,
  users,
  songs,
  song,
  playing,
  comments,
  songComments,
  likes,
  wave,
  duration
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
