import { authAction } from '../actionTypes';


export const login = (userToken, onSuccess, onError) => ({
    type: authAction.LOGIN,
    payload: { userToken, onSuccess, onError},
});

export const register = (userToken, onSuccess, onError) => ({
    type: authAction.REGISTER,
    payload: { userToken, onSuccess, onError},
});

export const resume = (userToken, onSuccess, onError) => ({
    type: authAction.RESUME,
    payload: { userToken, onSuccess, onError},
});

export const logout = () => ({
    type: authAction.LOGOUT,
});