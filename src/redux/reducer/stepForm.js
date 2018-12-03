/* eslint-disable default-case */
import {
  FORM_SAVE_STEP1
} from '../actions/actionTypes';

const initForm = {
  payAccount: '周东', receiverAccount: '88888888888', receiverName: '林玲', amount: 999
};

const initForm2 = {
  password: ''
};

const stepFormReducer = (state = {
  formName: 'info',
  step1FormValues: initForm,
  step2FormValues: initForm2
}, action) => {
  switch (action.type) {
    case FORM_SAVE_STEP1:
      return { ...state, step1FormValues: action.step1FormValues };
  }
  return state;
};


export default stepFormReducer;
