import { ADD_USER, DEL_USER } from '../actionTypes';
import initialState from './data';


const user = (state = initialState, action) => {
    switch (action.type){
        case ADD_USER: {
            const { userToken } = action.payload;
            return {...state, userToken};
        }
        case DEL_USER: {
            delete state.userToken;
            return state;
        }
        default:
            return state;
    }
}

export default user;