

import React, { Component } from 'react';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { push } from 'react-router-redux';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
// 引入Antd的导航组件
import { Menu, message } from 'antd';

import styles from './header.less';
import GlobalHeader from '../GlobalHeader/index';
import logo from '../../img/logo.svg';
//http://www.bejson.com/convert/image_to_svg/

const SubMenu = Menu.SubMenu;
let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  //TODO1
  handleMenuCollapse = (collapsed) => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'global/changeLayoutCollapsed',
    //   payload: collapsed,
    // });
  };

  //TODO2
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'global/clearNotices',
    //   payload: type,
    // });
  };

  //react-router-redux 4/4, use push
  //TODO3
  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'triggerError') {
      dispatch(push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      // dispatch({
      //   type: 'login/logout',
      // });
    }
  };

  //TODO4
  handleNoticeVisibleChange = (visible) => {
    const { dispatch } = this.props;
    if (visible) {
      // dispatch({
      //   type: 'global/fetchNotices',
      // });
    }
  };

  render() {
    const {
      currentUser, //todo
      collapsed, //todo
      fetchingNotices, //todo
      notices, //todo
    } = this.props;
    const { isMobile: mb } = this.state;
    return (

      <GlobalHeader
        logo={logo}
        currentUser={currentUser}
        fetchingNotices={fetchingNotices}
        notices={notices}
        collapsed={collapsed}
        isMobile={mb}
        onNoticeClear={this.handleNoticeClear}
        onCollapse={this.handleMenuCollapse}
        onMenuClick={this.handleMenuClick}
        onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />

    );
  }
}

export default Header;
