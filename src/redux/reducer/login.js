/* eslint-disable default-case */
import * as types from '../actions/actionTypes';


const loginResult = {};

const LoginReducer = (state = {
  loginResult,
  loading: false
}, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, loading: true };
    case types.LOGIN_RST:
      return { ...state, loginResult: action.loginResult, loading: false };
  }
  return state;
};


export default LoginReducer;
