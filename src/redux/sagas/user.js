
import {
  put, take, call, fork, takeLatest
} from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import { APP_SERVE_URL, TOKEN_KEY } from '../../utils/constants';
import HttpUtils from '../../utils/HttpUtils';

//worker saga
function* fetchUserList(action) {
  try {
    //JsonResult.java
    const jsonResult = yield call(
      HttpUtils.post, `${APP_SERVE_URL}/user/all`, action.params
    );

    yield put({ type: types.LIST_RECV_USER, datalist: jsonResult });
  } catch (e) {
    console.log(e);
    yield put({ type: types.LIST_RECV_USER, datalist: { code: '500', msg: e } });
  }
}


// wacther saga
export function* watchUserList() {
  yield takeLatest(types.LIST_FETCH_USER, fetchUserList);
}
