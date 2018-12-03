/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  Checkbox, Alert, Icon, Form, Input, Button
} from 'antd';

// import Login from 'components/Login';
import styles from './Login.less';
import {
  LOGIN
} from '../../redux/actions/actionTypes';


const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// @connect(({ login, loading }) => ({
//   login,
//   submitting: loading.effects['login/login'],
// }))
@Form.create()
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    submit: false
  };

  onTabChange = (type) => {
    this.setState({ type });
  };

  fieldsChange = (e) => {
    console.log(`===fieldsChange==e==>${e}`);
    this.setState({ submit: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submit: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newValues = values;
        newValues.password = md5(values.password);

        console.log('new values of form: ', newValues);
        this.props.login(newValues);
        //alert(md5('password')); //password===5f4dcc3b5aa765d61d8327deb882cf99
      }
    });
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;


  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    //const userNameError = isFieldTouched('userName') && getFieldError('userName');
    //const passwordError = isFieldTouched('password') && getFieldError('password');

    //const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={classNames(styles.main, styles.login)}>

        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header} />
              <div className={styles.desc}>彻底还原这个page</div>
              {this.state.submit && this.props.loginResult.code && this.props.loginResult.code !== '200'
              && this.renderMessage(`账户或密码错误（lisi/password）登陆失败!(${this.props.loginResult.msg})`)}
            </div>

            <Form layout="inline" onSubmit={this.handleSubmit}>

              <FormItem
                hasFeedback

        >
                {getFieldDecorator('userId', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.fieldsChange} />
                )}
              </FormItem>
              <FormItem
                hasFeedback

        >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.fieldsChange} />
                )}
              </FormItem>

              <div>
                <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
                </Checkbox>
                <span style={{ float: 'right' }}>
              忘记密码
                </span>
              </div>

              <FormItem>
                <Button
                  type="primary"
                  className={styles.submit}
                  htmlType="submit"
                  loading={this.props.loading}
                  disabled={hasErrors(getFieldsError())}
          >
            Log in
                </Button>
              </FormItem>

              <div className={styles.other}>
              其他登录方式
                <Icon className={styles.icon} type="alipay-circle" />
                <Icon className={styles.icon} type="taobao-circle" />
                <Icon className={styles.icon} type="weibo-circle" />

              </div>


            </Form>

          </div>
        </div>
      </div>
    );
  }
}




const mapStateToProps = (state) => {
  const loginResult = state.login.loginResult;
  const loading = state.login.loading;
  console.log(loading);
  return {
    loginResult,
    loading
  };
};


const mapDispatchToProps = dispatch => ({
  login: values => dispatch({
    type: LOGIN,
    loginFormValues: values, //this.props.form.getFieldsValue(),
  }),
  redirectTo: url => dispatch(url)
});



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
