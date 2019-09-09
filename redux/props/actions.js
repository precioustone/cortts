import { propsAction } from '../actionTypes';


export const updateProp = ( onSuccess, onError) => ({
    type: propsAction.UPDATE_PROPS,
    payload: { onSuccess, onError },
});

export const addProp = (prop, onSuccess, onError) => ({
    type: propsAction.ADD_PROP,
    payload: { prop, onSuccess, onError },
});

export const delProp = (row, onSuccess, onError) => ({
    type: propsAction.DEL_PROP,
    payload: { row, onSuccess, onError },
});


export const editProp = (prop, onSuccess, onError) => ({
    type: propsAction.EDIT_PROP,
    payload: { prop, onSuccess, onError },
});

export const uploadImage = ( images, onSuccess, onError) => ({
    type: propsAction.UPLOAD_IMAGE,
    payload: { images, onSuccess, onError },
});



