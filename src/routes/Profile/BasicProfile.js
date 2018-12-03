import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card, Badge, Table, Divider, Row, Col
} from 'antd';

import PageHeaderLayout from '../../components/PageHeader/PageHeaderLayout';
import styles from './BasicProfile.less';
import * as types from '../../redux/actions/actionTypes';


const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text => (text === 'success' ? (
      <Badge status="success" text="成功" />
    ) : (
      <Badge status="processing" text="进行中" />
    )),
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

// @connect(({ profile, loading }) => ({
//   profile,
//   loading: loading.effects['profile/fetchBasic'],
// }))
class BasicProfile extends Component {
  componentDidMount() {
    this.props.fetchBasic();
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'profile/fetchBasic',
    // });
  }

  render() {
    const { data, loading } = this.props;
    //const {data: { basicGoods, basicProgress },} = this.props; //another way

    const { basicGoods, basicProgress } = data;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach((item) => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };

    const colResp = { xs: 24, sm: 12, md: 6 };

    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        render: renderContent,
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    return (
      <PageHeaderLayout title="基础详情页">
        <Card bordered={false}>
          <div>
            <div className={styles.title}>退款申请</div>
            <Row gutter={32} style={{ marginBottom: 32 }}>
              <Col {...colResp}>取货单号: 1000000000</Col>
              <Col {...colResp}>状态: 已取货</Col>
              <Col {...colResp}>销售单号: 1234123421</Col>
              <Col {...colResp}>子订单: 3214321432</Col>
            </Row>
          </div>
          <Divider style={{ marginBottom: 32 }} />
          <div>
            <div className={styles.title}>用户信息</div>
            <Row gutter={32} style={{ marginBottom: 32 }}>
              <Col {...colResp}>用户姓名: 付小小</Col>
              <Col {...colResp}>联系电话: 18100000000</Col>
              <Col {...colResp}>常用快递: 菜鸟仓储</Col>
              <Col {...colResp}>取货地址: 浙江省杭州市西湖区万塘路18号</Col>
              <Col {...colResp}>备注: 无</Col>
            </Row>
          </div>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>退货商品</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>退货进度</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}




//redux part
const mapStateToProps = (state) => {
  const data = state.dataDtl.basic;
  return {
    data
  };
};


const mapDispatchToProps = dispatch => ({
  //normal Steps: connect ---> saga worker --> saga watcher-->regs --> action reducers -->regs
  fetchBasic: () => dispatch({
    type: types.FETCH_DATA_BASIC
  }),
  redirectTo: url => dispatch(url)
});



export default connect(mapStateToProps, mapDispatchToProps)(BasicProfile);
