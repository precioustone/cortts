import { imageAction } from '../actionTypes';


const images = (state = {}, action) => {
    switch (action.type){
        case imageAction.UPLOAD_SUCCESS: {
            const { id, images } = action.payload;
            state[id] = images;
            return state;
        }
        default:
            return state;
    }
}

export default images;