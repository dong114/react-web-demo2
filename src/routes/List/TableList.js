
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Table,
  Alert
} from 'antd';
// import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../components/PageHeader/PageHeaderLayout';
import UpdateForm from './UpdateSubForm';
import CreateForm from './AddSubForm';
import * as types from '../../redux/actions/actionTypes';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

//value用,连接
const getValue = obj => Object.keys(obj)
  .map(key => obj[key])
  .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];




//额外function 需要在class外面
//一直在列头上维持一个total变量
// function initTotalList(columns) {
//   const totalList = [];
//   columns.forEach((column) => {
//     if (column.needTotal) {
//       totalList.push({ ...column, total: 0 });
//     }
//   });
//   return totalList;
// }

// @connect(({ rule, loading }) => ({
//   rule,
//   loading: loading.models.rule,
// }))
@Form.create()
class TableList extends PureComponent {
  // static defaultProps = {

  // }


  //不会被init, 只是definition
  state = {
    modalVisible: false, //处理`新建` window
    updateModalVisible: false, //处理 update window
    expandForm: false, //查询部分是否展开
    selectedRows: [], //当前选择的row
    formValues: {}, //查询form用

    stepFormValues: {}, //update sub window form data
  };



  constructor(props) {
    super(props);
    const { columns } = props;
    //unnecessary
    //const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      //needTotalList,
    };
  }


  //dispatch action
  componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }

  handleSearch = (e) => {
    e.preventDefault(); //阻止default behaviour

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      //https://ant.design/components/form-cn/
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      this.props.fetchList(values);
      // dispatch({
      //   type: 'rule/fetch',
      //   payload: values,
      // });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.props.fetchList();
    // dispatch({
    //   type: 'rule/fetch',
    //   payload: {},
    // });
  };

  toggleForm = () => {
    const { expandForm } = this.state;

    this.setState({
      expandForm: !expandForm,
    });
  };

  // onChange分页、排序、筛选变化时触发 https://ant.design/components/table-cn/
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    //const { dispatch } = this.props; //来自redux
    const { formValues } = this.state; //查询form

    //reduce函数
    console.log(`table onChange--filtersArg-->${filtersArg}`);
    // const filters = Object.keys(filtersArg).reduce((obj, key) => {
    //   const newObj = { ...obj };
    //   newObj[key] = getValue(filtersArg[key]);
    //   return newObj;
    // }, {});

    console.log(`table onChange--pagination-->${pagination}`);
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      //...filters,
    };

    console.log(`table onChange--sorter-->${sorter}`);
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }


    this.props.fetchList(params);
    // dispatch({
    //   type: 'rule/fetch',
    //   payload: params,
    // });
  };


  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`table rowSelection--onChange---selectedRowKeys-->${selectedRowKeys}`); //自动填充keys
    console.log(`table rowSelection--onChange---selectedRows-->${selectedRows}`); //自动填充rows

    //const { needTotalList: list } = this.state;
    //const { onSelectRow } = this.props;

    //只为计算total value
    //let needTotalList = [...list];
    //needTotalList = needTotalList.map(item => ({
    //  ...item,
    //  total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    //}));

    //if (onSelectRow) {
    //this.onSelectRow(selectedRows);
    //}
    this.setState({
      selectedRows,
    });

    this.setState({
      selectedRowKeys
    });
  };

  //======================sub window start
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = (fields) => {
    const { addNew } = this.props;
    // dispatch({
    //   type: 'rule/add',
    //   payload: {
    //     description: fields.desc,
    //   },
    // });
    console.log(`sub form fields=====>${fields}`);
    addNew(fields);

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleUpdate = (fields) => {
    const { dispatch } = this.props;
    //TODO
    // dispatch({
    //   type: 'rule/update',
    //   payload: {
    //     name: fields.name,
    //     desc: fields.desc,
    //     key: fields.key,
    //   },
    // });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  //=====================sub window end


  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }


  render() {
    const {
      data: { list, pagination },
      //data,
      loading,
    } = this.props;


    const {
      selectedRows, //Table 上面选中的rows
      modalVisible,
      stepFormValues,
      updateModalVisible
    } = this.state;

    //猎头定义
    const columns = [
      {
        title: '规则编号',
        dataIndex: 'no',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '服务调用次数',
        dataIndex: 'callNo',
        sorter: true,
        align: 'right',
        render: val => `${val} 万`, //格式化col内容
        // mark to display a total number
        needTotal: true, //新定义的变量， 用来额外计算， 填写到其他地方Alert
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0], //转义用
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        onFilter: (value, record) => record.status.toString() === value, //record 当前行, 和上面的filters搭配提供value
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
          //https://ant.design/components/badge-cn/  最终  原点+文字
        },
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>, //moment格式化
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
            <Divider type="vertical" />
            <a href="">订阅警报</a>
          </Fragment>
        ),
      },
    ];

    const { selectedRowKeys, needTotalList } = this.state;

    //https://ant.design/components/table-cn/#rowSelection
    //选择row checkbox 时发生
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange, //选中项发生变化时的回调
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    //for new add window
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    //for upfate window
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <Table
              loading={loading}
              rowKey="key" //表格行 key 的取值，可以是字符串(json列名)或一个函数
              rowSelection={rowSelection}
              dataSource={list}
              columns={columns}
              pagination={paginationProps}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderLayout>
    );
  }
}

//redux part
const mapStateToProps = (state) => {
  const data = state.tablist.datalist;
  const loading = state.tablist.loading;
  return {
    data, loading
  };

  //mapStateToProps() in Connect(Form(TableList)) must return a plain object. Instead received
  //return data;
};


const mapDispatchToProps = dispatch => ({
  //fetchPosts: () => dispatch({ type: GET_POSTS_SAGA })
  fetchList: params => dispatch({
    type: types.LIST_FETCH,
    loading: true,
    params: params || {} //normal steps: add params names ---> saga worker to post(action) --> backend receive the parames
  }),
  addNew: formValues => dispatch({
    type: types.LIST_ADD,
    formValues
  }),
  redirectTo: url => dispatch(url)
});



export default connect(mapStateToProps, mapDispatchToProps)(TableList);
