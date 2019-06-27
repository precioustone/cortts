import { ADD_USER, DEL_USER } from '../actionTypes';

const initialState = {
    loggedIn: false,
    errorMsg: null,
    email: '',
    name: '',
    phone: '',
    loggedIn_at: '',
};

function user(state = '', action){
    
    switch (action.type){
        case ADD_USER: {
            const { userToken } = action.payload;
            //return Object.assign({}, state, 
               // {loggedIn: true, email: userToken.email, name: userToken.name, loggedIn_at: '30-09-2019', phone: '+23480 000 0001'})
               return state = userToken;
        }
        case DEL_USER: {
            //return Object.assign({}, state, 
              //  {loggedIn: true, email: userToken.email, name: userToken.name, loggedIn_at: '30-09-2019', phone: '+23480 000 0001'})
              return state = '';
        }
        default:{
            return state = '';
        }
    }
}

export default user;