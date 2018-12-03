import React, { Fragment } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import {
  Form, Input, Button, Select, Divider
} from 'antd';
import { bindActionCreators } from 'redux';
import stepFormReducer from '../../../redux/reducer/stepForm';


import {
  FORM_SAVE_STEP1
} from '../../../redux/actions/actionTypes';

import './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};


@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const {
      form, saveForm1, redirectTo, data
    } = this.props;

    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          saveForm1(values);
          redirectTo(push('/form/step-form/confirm'));
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className="stepForm" hideRequiredMark>
          <Form.Item {...formItemLayout} label="付款账户">
            {getFieldDecorator('payAccount', {
              initialValue: data.payAccount,
              rules: [{ required: true, message: '请选择付款账户' }],
            })(
              <Select placeholder="test@example.com">
                <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款账户">
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>
              {getFieldDecorator('receiverAccount', {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: '请输入收款人账户' },
                  { type: 'email', message: '账户名应为邮箱格式' },
                ],
              })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款人姓名">
            {getFieldDecorator('receiverName', {
              initialValue: data.receiverName,
              rules: [{ required: true, message: '请输入收款人姓名' }],
            })(<Input placeholder="请输入收款人姓名" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="转账金额">
            {getFieldDecorator('amount', {
              initialValue: data.amount,
              rules: [
                { required: true, message: '请输入转账金额' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ],
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>
          <Form.Item
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
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className="desc">
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const data = state.stepForm.step1FormValues; //needs the name defined in reducer index registration
  return {
    data
  };
};


const mapDispatchToProps = dispatch => ({
  //fetchPosts: () => dispatch({ type: GET_POSTS_SAGA })
  saveForm1: values => dispatch({
    type: FORM_SAVE_STEP1,
    step1FormValues: values, //this.props.form.getFieldsValue(),
  }),
  redirectTo: url => dispatch(url)
});

// const putFormStep1 = bindActionCreators(stepFormReducer, dispatch);
// return {
//   putFormStep1,
// };


export default connect(mapStateToProps, mapDispatchToProps)(Step1);
