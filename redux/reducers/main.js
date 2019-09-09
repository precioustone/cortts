import { combineReducers } from 'redux';
import user from './user';
import properties from './properties';


const rootReducer = combineReducers({user,properties});

export default rootReducer;
