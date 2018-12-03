
/* eslint-disable import/no-extraneous-dependencies  */
//https://github.com/nuysoft/Mock/wiki
//http://mockjs.com/examples.html

//https://www.npmjs.com/package/axios

// 引入mockjs
import Mock from 'mockjs';

import { productData } from './tpl';
import { productListData, receiveAddForm } from './tabList';

import { getProfileBasicData, getProfileAdvancedData } from './profile';




// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/header/help', 'get', productData);
Mock.mock('/user/query', 'post', productData);

//for List module
Mock.mock('/list/query', 'post', productListData);
Mock.mock('/list/add', 'post', receiveAddForm);

//for data detail module
Mock.mock('/dataDtl/basic', 'get', getProfileBasicData);
Mock.mock('/dataDtl/advanced', 'get', getProfileAdvancedData);


//export default Mock;
