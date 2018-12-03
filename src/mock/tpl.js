/* eslint-disable import/no-extraneous-dependencies  */

import Mock from 'mockjs';

//const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

// mock一组数据
export const productData = function productData() {
  const Data = [];
  for (let i = 0; i < 100; i++) {
    const data = {
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
    };
    Data.push(data);
  }

  return {
    Data
  };
};

export default productData;
