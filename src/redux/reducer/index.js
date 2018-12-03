import { combineReducers } from 'redux';
//react-router-redux 1/4, put into reducer
import { routerReducer } from 'react-router-redux';
import stepForm from './stepForm';
import tablist from './tabList';
import dataDtl from './dataDtl';
import login from './login';
import user from './user';


const appReducer = (() => combineReducers(
  {
    routing: routerReducer,
    stepForm,
    tablist,
    dataDtl,
    login,
    user
  }
))();


export default appReducer;

