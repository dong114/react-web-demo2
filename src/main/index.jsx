import React, { Component } from 'react';
import {
  HashRouter, Switch, Route, Redirect, Link,
} from 'react-router-dom';





import {
  Layout, Menu, Icon, message
} from 'antd';
import CSider from '../components/Sider';
import CHeader from '../components/Header';
import CRoutes from '../components/Content';

//release时候， 去除
import '../mock/mock';
import styles from './index.less';


const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    collapsed: false,
  };



  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }





  render() {
    return (
      <HashRouter basename="/">
        <Layout>

          <Sider
            theme="dark"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}>
            <CSider />
          </Sider>

          <Layout>

            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle} />
              <CHeader />
            </Header>

            <Content>
              <CRoutes />
            </Content>

          </Layout>
        </Layout>

      </HashRouter>
    );
  }
}


export default App;
