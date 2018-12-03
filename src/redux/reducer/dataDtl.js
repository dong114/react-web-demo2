/* eslint-disable default-case */
import * as types from '../actions/actionTypes';

const basic = { basicGoods: [], basicProgress: [] };
const advanced = {};

const DataDtlReducer = (state = {
  basic,
  advanced,
  error: null
}, action) => {
  switch (action.type) {
    case types.FETCH_DATA_BASIC_RESP:
      return { ...state, basic: action.basic };
    case types.FETCH_DATA_ADVANCED_RESP:
      return { ...state, advanced: action.advanced };
  }
  return state;
};


export default DataDtlReducer;

