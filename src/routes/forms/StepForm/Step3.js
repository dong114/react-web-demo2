import React, { Fragment } from 'react';

import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import Result from '../../../components/Result';
import styles from './style.less';

// @connect(({ form }) => ({
//   data: form.step,
// }))
class Step3 extends React.PureComponent {
  render() {
    const { dispatch, data } = this.props;
    const onFinish = () => {
      //dispatch(routerRedux.push('/form/step-form'));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            付款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.payAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款人姓名：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            转账金额：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.amount}</span> 元
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          再转一笔
        </Button>
        <Button>查看账单</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="预计两小时内到账"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}


const mapStateToProps = (state) => {
  const data = state.stepForm.step1FormValues;
  return {
    data
  };
};


const mapDispatchToProps = dispatch => ({
  // confirmForm: values => dispatch({
  //   type: FORM_SAVE_STEP2,
  //   step2FormValues: values, //this.props.form.getFieldsValue(),
  // }),
  redirectTo: url => dispatch(url)

});

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
