
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
function* fetchDataBasic(action) {
  try {
    const respList = yield call(
      //HttpUtils.get, `${GET_YQ_YUE_MAIN}`, //this can be run
      axios.get, '/dataDtl/basic',
    );

    console.log(`-------------------------------${respList}`);
    yield put({ type: types.FETCH_DATA_BASIC_RESP, basic: respList.data });

    //import { push } from 'react-router-redux';
    //yield call(browserHistory.push('/chat'))
  } catch (e) {
    console.log(e);
    yield put({ type: types.FETCH_DATA_BASIC_RESP, error: e });
  }
}

function* fetchDataAdvanced(action) {
  try {
    const respList = yield call(
      //HttpUtils.get, `${GET_YQ_YUE_MAIN}`, //this can be run
      axios.get, '/dataDtl/advanced',
    );


    yield put({ type: types.FETCH_DATA_ADVANCED_RESP, advanced: respList.data });

    //import { push } from 'react-router-redux';
    //yield call(browserHistory.push('/chat'))
  } catch (e) {
    console.log(e);
    yield put({ type: types.FETCH_DATA_ADVANCED_RESP, error: e });
  }
}


// wacther saga
export function* watchFetchDataBasic() {
  yield takeLatest(types.FETCH_DATA_BASIC, fetchDataBasic);
}

export function* watchFetchDataAdvanced() {
  yield takeLatest(types.FETCH_DATA_ADVANCED, fetchDataAdvanced);
}


