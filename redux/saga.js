import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import propSagas from './props/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    propSagas(),
  ]);
}
