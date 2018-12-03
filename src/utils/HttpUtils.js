import { TOKEN_KEY } from './constants';
import { loadSessionStorage } from './utils';

export const defaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };
export const formHeaders = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', Accept: 'application/json' };
export const uploadHeasers = { 'Content-Type': 'multipart/form-data' };
export const textHeasers = { 'Content-Type': 'text/plain' };

//一个 Promise 就是一个代表了异步操作最终完成或者失败的对象
export default class HttpUtils {
    static get=url => new Promise(((resolve, reject) => {
    //resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）
    //或rejected（失败）
      const newHeader = {
        AuthToken: loadSessionStorage(TOKEN_KEY), //same as defined in back-end interface
        ...defaultHeaders,
      };
      fetch(url, {
        method: 'GET',
        headers: newHeader,
      })//默认是GET
        .then(response => response.json())
        //把数据解析成json格式,然后取出
        .then((result) => {
          resolve(result);
          HttpUtils.extractEntity(result);
        })
        .catch((error) => {
          reject(error);
        });
    }));

    static post=(url, data, header) => new Promise(((resolve, reject) => {
      const custHeader = (header || defaultHeaders);
      const newHeader = {
        AuthToken: loadSessionStorage(TOKEN_KEY),
        ...custHeader,
      };
      fetch(url, {
        method: 'POST',
        headers: newHeader,
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then((result) => {
          resolve(result);
          HttpUtils.extractEntity(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    }))


    static extractEntity = (jsonResult) => {
      if (jsonResult) {
        //to do further filter of result
        console.log('to filter if necessary====>', jsonResult);
      }
    }
}




//数据转换成字符串JSON.stringify(params)
//将数据JSON化JSON.parse(responseJSON)
/**
 *
HttpUtils.get(url)//调用自定义组件方法，返回一个Promise
            .then(result=>{//then函数会返回一个新的promise
                this.setState({
                    result:JSON.stringify(result),//序列化：转换为一个 (字符串)JSON字符串
                });
            })
            .catch(error=> {
                this.setState({
                    result: JSON.stringify(error),//把错误信息格式化为字符串
                })
            })


 HttpUtils.post(url,data)
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result),//序列化：转换为一个 (字符串)JSON字符串
                });
            })
            .catch(error=> {
                this.setState({
                    result: JSON.stringify(error),//把错误信息格式化为字符串
                })
            })



 */
/**
uploadImage(){
    let formData = new FormData();
    let file = { uri: uri, type: 'multipart/form-data', name: 'a.jpg' };
    formData.append("images", file);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
        .then((response) => response.text())
        .then((responseData) => {
            console.log('responseData', responseData);
        })
        .catch((error) => { console.error('error', error) });
};

 */
