import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
// 引入Antd的导航组件
import { Menu, Icon } from 'antd';
import styles from './sider.less';
import getMenuData from './menu';


const SubMenu = Menu.SubMenu;

class Sider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
getIcon = (icon) => {
  if (typeof icon === 'string') {
    if (icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
    }
    return <Icon type={icon} />;
  }

  return icon;
};

  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    const { Authorized } = this.props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };


  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {this.getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };


  // conversion Path
  // 转化路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path);
    const icon = this.getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    //https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md

    return (
      <Link
        to={itemPath}
        target={target}
        //replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  render() {
    //const { menuData } = getMenuData();
    return (
      <div id="leftMenu">
        <div className={styles.logo}>
          <Link to="/"><Icon type="home" color="white" />主菜单</Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={['sub1', 'sub2']}
          defaultSelectedKeys={['1']}>

          {this.getNavMenuItems(getMenuData())}

        </Menu>
      </div>
    );
  }
}

export default Sider;
