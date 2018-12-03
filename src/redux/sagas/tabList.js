
import {
  put, take, call, fork, takeLatest
} from 'redux-saga/effects';

//https://www.npmjs.com/package/axios
import axios from 'axios';
/**
   * https://github.com/jasonmerino/react-native-simple-store#readme
   * React-native-simple-store allows you to easily store data by assigning it a unique key
         yield call(store.save, 'typeList', typeList.showapi_res_body.typeList);
   */
import * as types from '../actions/actionTypes';

import HttpUtils from '../../utils/HttpUtils';

//worker saga
function* fetchTabList(action) {
  try {
    const respList = yield call(
      axios.post, '/list/query', action.params
    );


    yield put({ type: types.LIST_RECV, datalist: respList.data });

    //import { push } from 'react-router-redux';
    //yield call(browserHistory.push('/chat'))
  } catch (e) {
    console.log(e);
    yield put({ type: types.LIST_RECV, error: e });
  }
}

function* addNew(action) {
  try {
    const respList = yield call(
      axios.post, '/list/add', action.formValues
    );


    yield put({ type: types.LIST_RECV, datalist: respList.data });

    //import { push } from 'react-router-redux';
    //yield call(browserHistory.push('/chat'))
  } catch (e) {
    console.log(e);
    yield put({ type: types.LIST_RECV, error: e });
  }
}

// wacther saga
export function* watchGetTabList() {
  yield takeLatest(types.LIST_FETCH, fetchTabList);
}

export function* watchAddNew() {
  yield takeLatest(types.LIST_ADD, addNew);
}
