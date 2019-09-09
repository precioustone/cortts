import { all, takeEvery, put, call, fork} from 'redux-saga/effects';

import Props  from '../../db/props';
import Images from '../../db/image';
import { propsAction } from '../actionTypes';


export function* updatePropState() {
    yield takeEvery(propsAction.UPDATE_PROPS, function*({ payload }) {

      const { onSuccess, onError } = payload;
      
      const result = yield call(Props.getProps);
      
      if (result.status) {
        yield put({
          type: propsAction.UPDATE_SUCCESS,
          payload: result.props,
          onSuccess,
        });
      } else {
        //notification('error', result.error || result);
        yield put({ type: propsAction.UPDATE_ERROR, onError,  msg: result.msg, status: result.status });
      }
    });
  }

  export function* addPropState() {
    yield takeEvery(propsAction.ADD_PROP, function*({ payload }) {

      const { onSuccess, onError, prop } = payload;
      
      const result = yield call(Props.addProp, prop );
      
      if (result.status) {
        yield put({
          type: propsAction.UPDATE_SUCCESS,
          payload: result.props,
          onSuccess,
          msg: result.msg,
          status: result.status,
        });
      } else {
        //notification('error', result.error || result);
        yield put({ type: propsAction.UPDATE_ERROR, onError,  msg: result.msg, status: result.status });
      }
    });
  }

  export function* editPropState() {
    yield takeEvery(propsAction.EDIT_PROP, function*({ payload }) {
      const { prop , onSuccess, onError } = payload;
      
      const result = yield call( Props.editProp, prop);

      if (result.status) {
        yield put({
          type: propsAction.UPDATE_SUCCESS,
          payload: result.props,
          onSuccess,
          msg: result.msg,
          status: result.status,
        });
      } else {
        //notification('error', result.error || result);
        yield put({ type: propsAction.UPDATE_ERROR, onError,  msg: result.msg, status: result.status });
      }
    });
  }

  export function* updateImageState() {
    yield takeEvery(propsAction.UPLOAD_IMAGE, function*({ payload }) {

      const { images, onSuccess, onError } = payload;
      
      const result = yield call(Images.addImages, images);
      if (result.status) {
        yield put({
          type: propsAction.UPDATE_SUCCESS,
          payload: result.props,
          onSuccess,
          msg: result.msg,
          status: result.status
        });
      } else {
        yield put({ type: propsAction.UPDATE_ERROR, onError,  msg: result.msg ? result.msg : result.message, status: result.status });
      }
    });
  }

  export function* delProp() {
    yield takeEvery(propsAction.DEL_PROP, function*({ payload }) {
      const { row, onSuccess, onError } = payload;
      
      const result = yield call( Props.delProp, row.rowKey);
    
      if (result.status) {
        yield put({
          type: propsAction.DEL_SUCCESS,
          payload: row,
          onSuccess,
        });
      } else {
        yield put({ type: propsAction.UPDATE_ERROR, onError,  msg: result.msg, status: result.status });
      }
    });
  }

  export function* updateSuccess() {
    yield takeEvery(propsAction.UPDATE_SUCCESS, function*({ onSuccess, msg, status}) {
      if(msg && status)
        onSuccess(msg, status);
      else
        onSuccess()
       
    });
  }

  export function* delSuccess() {
    yield takeEvery(propsAction.DEL_SUCCESS, function*({ payload, onSuccess, }) {
      const { rowMap, rowKey} = payload;
      
      onSuccess(rowMap, rowKey);
    });
  }
  
  export function* updateError() {
    yield takeEvery(propsAction.UPDATE_ERROR, function*({onError, msg, status}) {
       
      onError(msg, status)
    });
  }

export default function* rootSaga() {
  yield all([
    fork(addPropState),
    fork(editPropState),
    fork(delProp),
    fork(delSuccess),
    fork(updatePropState),
    fork(updateSuccess),
    fork(updateError),
    fork(updateImageState),
  ]);
}
