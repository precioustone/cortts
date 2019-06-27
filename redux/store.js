import { createStore } from 'redux';
import rootReducer from './reducers/main';

let store = createStore(rootReducer);

export default store;