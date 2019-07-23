import { combineReducers } from 'redux';
import user from './user';
import properties from './properties';
import images from './image';


const rootReducer = combineReducers({user,properties,images});

export default rootReducer;
