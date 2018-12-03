import {
  Table, Button, Form, Alert
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PageHeaderLayout from '../../components/PageHeader/PageHeaderLayout';

// import Login from 'components/Login';
import styles from './UserList.less';
import {
  LIST_FETCH_USER
} from '../../redux/actions/actionTypes';


@Form.create()
class UserListPage extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };


  componentDidMount() {
    const params = { current: 1, pageSize: 4 };
    this.props.fetchList(params);
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('=======Various parameters==========>', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });

    this.props.fetchList(pagination);
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  setUserIdSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'userId',
      },
    });
  }

  renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;

  render() {
    const {
      jr,
      loading,
    } = this.props;

    const list = jr.data && jr.data.list ? jr.data.list : [];
    const pagination = jr.data && jr.data.pagination ? jr.data.pagination : {};

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const columns = [{
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
      filters: [
        { text: 'lisi', value: 'lisi' },
        { text: 'wanger', value: 'wanger' },
      ],
      filteredValue: filteredInfo.userId || null,
      onFilter: (value, record) => record.userId.includes(value),
      //sorter: (a, b) => a.userId.length - b.userId.length,
      sorter: (a, b) => a.userId.toUpperCase() < b.userId.toUpperCase(), //ignore case
      sortOrder: sortedInfo.columnKey === 'userId' && sortedInfo.order,
    },
    {
      title: 'UserName',
      dataIndex: 'userName',
    },
    {
      title: 'loginFailedCnt',
      dataIndex: 'loginFailedCnt',
      key: 'loginFailedCnt',
      sorter: (a, b) => a.loginFailedCnt - b.loginFailedCnt,
      sortOrder: sortedInfo.columnKey === 'loginFailedCnt' && sortedInfo.order,
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'fkRole',
    },
    {
      title: 'LatestActiveTime',
      dataIndex: 'latestActiveTime',
    }];
    return (
      <PageHeaderLayout title="用户列表">
        <div>
          <div>
            {this.props.jr.code && this.props.jr.code !== '200'
              && this.renderMessage(`查询后台数据错误!(${this.props.jr.msg})`)}
          </div>
          <div className={styles.tableOperations}>
            <Button type="primary" onClick={this.setUserIdSort}>Sort userId</Button>
            <Button type="primary" onClick={this.clearFilters}>Clear filters</Button>
            <Button type="primary" onClick={this.clearAll}>Clear filters and sorters</Button>
          </div>
          <Table
            columns={columns}
            rowKey="userId" //表格行 key 的取值，可以是字符串(json列名)或一个函数
            loading={loading}
            dataSource={list}
            pagination={paginationProps}
            onChange={this.handleChange} />
        </div>
      </PageHeaderLayout>
    );
  }
}


const mapStateToProps = (state) => {
  const jr = state.user.datalist;
  const loading = state.user.loading;
  return {
    jr,
    loading
  };
};


const mapDispatchToProps = dispatch => ({
  fetchList: params => dispatch({
    type: LIST_FETCH_USER,
    loading: true,
    params: params || {}
  }),
  redirectTo: url => dispatch(url)
});



export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
