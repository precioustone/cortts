import { authAction } from '../actionTypes';

const initialState = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    created_at: "",
    last_loggedIn: "",
}

function user(state = initialState, action){
    
    switch (action.type){
        case authAction.SUCCESS: {
            const { payload } = action;
            let newState = { ...state, ...payload }
            return newState;
        }
        case authAction.LOGOUT: {
            return initialState;
        }
        default:{
            return state;
        }
    }
}

export default user;