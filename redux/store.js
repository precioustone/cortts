import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/main';
import rootSage from './saga'


let sagaMiddleware = createSagaMiddleware();

let store = createStore( rootReducer, applyMiddleware(sagaMiddleware) );

sagaMiddleware.run(rootSage);

export default store;