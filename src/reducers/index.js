import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

export default combineReducers({
    pikachu: () => 'Ryan Reynolds',
    auth: AuthReducer
});