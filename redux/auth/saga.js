import { all, takeEvery, put, call, fork} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import Auth  from '../../db/auth';
import { authAction } from '../actionTypes';

export function* loginRequest() {
  yield takeEvery(authAction.LOGIN, function*({ payload }) {
    const { userToken, onSuccess, onError } = payload;
    
    const result = yield call( Auth.login, userToken);
    if (result.status) {
      yield put({
        type: authAction.SUCCESS,
        payload: result.user,
        onSuccess,
        remember: result.remember,
      });
    } else {
      //notification('error', result.error || result);
      yield put({ type: authAction.ERROR, onError,  msg: result.msg, });
    }
  });
}

export function* resumeSession() {
  yield takeEvery(authAction.RESUME, function*({payload}){

    const {userToken, onSuccess} = payload;
    
    if(userToken){
      yield put({
        type: authAction.SUCCESS,
        payload: userToken,
        onSuccess,
      });
    }
  });
}

export function* registerRequest() {
  yield takeEvery(authAction.REGISTER, function*({ payload }) {
    const { userToken, onSuccess, onError } = payload;
    
    const result = yield call( Auth.register, userToken);
    if (result.status) {
      yield put({
        type: authAction.SUCCESS,
        payload: result.user,
        onSuccess,
        remember: result.remember,
      });
    } else {
      //notification('error', result.error || result);
      yield put({ type: authAction.ERROR, onError,  msg: result.msg, });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(authAction.SUCCESS, function*({ payload, onSuccess, remember }) {
    if(remember)
      yield AsyncStorage.setItem('userToken', JSON.stringify(payload));
    
    onSuccess()
    
  });
}

export function* loginError() {
  yield takeEvery(authAction.ERROR, function*({onError, msg}) {
    onError(msg)
  });
}

export function* logout() {
  yield takeEvery(authAction.LOGOUT, function*() {
    //clearToken();
    //yield put(push('/'));
  });
}

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
    fork(registerRequest),
    fork(resumeSession),
  ]);
}
