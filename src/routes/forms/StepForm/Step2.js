import React from 'react';

import {
  Form, Input, Button, Alert, Divider
} from 'antd';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';
import {
  FORM_SAVE_STEP2
} from '../../../redux/actions/actionTypes';
import stepFormReducer from '../../../redux/reducer/stepForm';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const {
      form, data, submitting, confirmForm, redirectTo,
    } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      redirectTo(push('/form/step-form/info'));
    };
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          confirmForm(values);
          // dispatch({
          //   type: 'form/submitStepForm',
          //   payload: {
          //     ...data,
          //     ...values,
          //   },
          // });
          redirectTo(push('/form/step-form/result'));
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="确认转账后，资金将直接打入对方账户，无法退回。"
          style={{ marginBottom: 24 }}
        />
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="付款账户">
          {data.payAccount}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="收款账户">
          {data.receiverAccount}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="收款人姓名">
          {data.receiverName}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="转账金额">
          <span className={styles.money}>{data.amount}</span>
          <span className={styles.uppercase}>
            （
            {digitUppercase(data.amount)}
            ）
          </span>
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="支付密码" required={false}>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [
              {
                required: true,
                message: '需要支付密码才能进行支付',
              },
            ],
          })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  //这么写真nb
  //const {data} = state.stepForm.step1FormValues;
  const data = state.stepForm.step1FormValues;
  return {
    data
  };
};


const mapDispatchToProps = dispatch => ({
  confirmForm: values => dispatch({
    type: FORM_SAVE_STEP2,
    step2FormValues: values, //this.props.form.getFieldsValue(),
  }),
  redirectTo: url => dispatch(url)

});

// const putFormStep1 = bindActionCreators(stepFormReducer, dispatch);
// return {
//   putFormStep1,
// };


export default connect(mapStateToProps, mapDispatchToProps)(Step2);
// export default connect(({ form, loading }) => ({
//   submitting: loading.effects['form/submitStepForm'],
//   data: form.step,
// }))(Step2);
