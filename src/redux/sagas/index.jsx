import { all, fork } from 'redux-saga/effects';
import { watchGetTabList, watchAddNew } from './tabList';
import { watchFetchDataBasic, watchFetchDataAdvanced } from './dataDtl';
import { watchLogin } from './login';
import { watchUserList } from './user';

// root saga
export default function* rootSaga() {
  //yield watchGetTabList();
  yield all([

    fork(watchGetTabList),
    fork(watchAddNew),

    fork(watchFetchDataBasic),
    fork(watchFetchDataAdvanced),

    fork(watchLogin),
    fork(watchUserList),

  ]);
  /**
   * all - 创建一个 Effect 描述信息，用来命令 middleware 并行地运行多个 Effect，
   * 并等待它们全部完成。这是与标准的 Promise#all 相当对应的 API。
   */
}
