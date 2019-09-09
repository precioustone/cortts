import { ADD_PROP, ADD_USER, DEL_PROP, DEL_USER, EDIT_PROP, FILTER_PROP, UPLOAD_IMAGE} from './actionTypes';

export const addProp = (prop) => ({
    type: ADD_PROP,
    payload: { prop },
});

export const addUser = (userToken) => ({
    type: ADD_USER,
    payload: { userToken },
});

export const delProp = (id) => ({
    type: DEL_PROP,
    payload: { id },
});

export const delUser = () => ({
    type: DEL_USER,
});

export const editProp = (prop) => ({
    type: EDIT_PROP,
    payload: { prop },
});

export const filterProp = (keyword) => ({
    type: FILTER_PROP,
    payload: { keyword },
});

export const uploadImage = (id,images) => ({
    type: UPLOAD_IMAGE,
    payload: { id, images },
});


