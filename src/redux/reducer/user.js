/* eslint-disable default-case */
import {
  LIST_FETCH_USER, LIST_RECV_USER
} from '../actions/actionTypes';

const initData = { data: {} };

const UserReducer = (state = {
  datalist: initData,
  loading: true,
  error: null
}, action) => {
  switch (action.type) {
    case LIST_FETCH_USER: //also watched by saga
      return { ...state, loading: action.loading };
    case LIST_RECV_USER:
      return { ...state, datalist: action.datalist, loading: false };
  }
  return state;
};


export default UserReducer;
