import { ADD_USER, DEL_USER } from '../actionTypes';


function user(state = '', action){
    
    switch (action.type){
        case ADD_USER: {
            const { userToken } = action.payload;
               return state = userToken;
        }
        case DEL_USER: {
              return state = '';
        }
        default:{
            return state = '';
        }
    }
}

export default user;