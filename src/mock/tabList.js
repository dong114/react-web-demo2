

export const addNewRecordIntoList = function addNewRecordIntoList(formValues) {
//TODO...
};

// mock tableListDataSource 全局
const tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

//export const productListData = function productListData() {
export const productListData = function productListData(options) {
  //options has all pagination data in it.....
  const params = JSON.parse(options.body);

  const dataSource = [...tableListDataSource];

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const currentPage = parseInt(params.currentPage, 10) || 1;

  console.log(`current page -----------${currentPage}`);

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: currentPage,
    },
  };


  return result;

  /**
   * 排序典型代码
     let dataSource = [...tableListDataSource];

    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }
   */
};

export const receiveAddForm = function receiveAddForm(options) {
  const formValues = options.body;
  const i = Math.ceil(Math.random() * 10000);

  console.log(`post payload formValues=====>${typeof (formValues)}`); //string

  const formObj = JSON.parse(formValues);

  tableListDataSource.unshift({
    key: i,
    disabled: false,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽888',
    description: `${formObj.desc}`,
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 2,
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: Math.ceil(Math.random() * 100),
  });


  return tableListDataSource;
};
