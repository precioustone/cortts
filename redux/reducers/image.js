import { UPLOAD_IMAGE } from '../actionTypes';


const images = (state = {}, action) => {
    switch (action.type){
        case UPLOAD_IMAGE: {
            const { id, images } = action.payload;
            state[id] = images;
            return state;
        }
        default:
            return state;
    }
}

export default images;