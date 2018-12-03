/* eslint-disable default-case */
import {
  LIST_FETCH, LIST_RECV
} from '../actions/actionTypes';

const initData = [];

const TabListReducer = (state = {
  datalist: initData,
  loading: true,
  error: null
}, action) => {
  switch (action.type) {
    case LIST_FETCH: //also watched by saga
      return { ...state, loading: action.loading };
    case LIST_RECV:
      return { ...state, datalist: action.datalist, loading: false };
  }
  return state;
};


export default TabListReducer;
