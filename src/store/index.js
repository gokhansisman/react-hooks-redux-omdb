import movieReducer from './MovieReducer';
import detailReducer from './DetailReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    movie: movieReducer,
    detail: detailReducer
});