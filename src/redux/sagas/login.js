import {
  put, take, call, fork, takeLatest
} from 'redux-saga/effects';

import axios from 'axios';

import * as types from '../actions/actionTypes';
import { APP_SERVE_URL, TOKEN_KEY } from '../../utils/constants';
import { setSessionStorage, loadSessionStorage } from '../../utils/utils';
import HttpUtils from '../../utils/HttpUtils';

//worker saga
function* loginUser(action) {
  try {
    //jsonResult is same structure as defined in springboot unified interface.
    const jsonResult = yield call(
      HttpUtils.post, `${APP_SERVE_URL}/auth/token`, action.loginFormValues
    );


    yield put({ type: types.LOGIN_RST, loginResult: jsonResult });

    // Login successfully
    if (jsonResult.code === '200') {
      const tokenResult = jsonResult.data; //TokenResult.java
      setSessionStorage(TOKEN_KEY, tokenResult.token);

      const tokenStr = loadSessionStorage(TOKEN_KEY);

      console.log(`getToken from server===>${tokenStr}`);

      window.location.href = '/#/user/userList';
    }
    //import { push } from 'react-router-redux';
    //yield call(browserHistory.push('/chat'))
  } catch (e) {
    yield put({ type: types.LOGIN_RST, loginResult: { code: '500', msg: e } });
  }
}


// wacther saga
export function* watchLogin() {
  yield takeLatest(types.LOGIN, loginUser);
}

