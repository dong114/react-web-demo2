/* eslint-disable react/no-unescaped-entities */

import React, { Component } from 'react';

import {
  Switch, Route, Redirect,
} from 'react-router-dom';
// 引入Antd的导航组件
import { Menu, Icon } from 'antd';
import NotFound from '../../routes/Exception/404';
import styles from './content.less';
import getMenuData from '../Sider/menu';
import asyncComponent from '../AsyncComponent';
import BasicForm from '../../routes/forms/BasicForm';
import HomePage from '../../main/home';


const SubMenu = Menu.SubMenu;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  /**
   * get routes
   *
   */
  getRoutes = (menusData) => {
    if (!menusData) {
      return [];
    }
    const validMenu = menusData
      .filter(item => item.name) // && !item.hideInMenu
      .filter(item => item);
    const routeKeys = this.getFlatKeys(validMenu);

    const newRouteKeys = routeKeys.map((i) => {
      const AsyncComp = asyncComponent(() => import(`../../routes/${i.split('@@')[1]}`));
      const route = { path: i.split('@@')[0], comp: AsyncComp, exact: i.split('@@')[2] === 'true' };
      return route;
    });
    //console.log(newRouteKeys);
    //return extralRoutes.concat(newRouteKeys);

    return newRouteKeys;
  };



  /**
 * Recursively flatten the data
 * [{path:string},{path:string}] => [path,path2]
 * @param  menu
 */
 getFlatKeys = menu => menu.reduce((keys, item) => {
   if (item.route) {
     const exactAttr = item.exact ? item.exact : 'true';
     keys.push(`${item.path}@@${item.route}@@${exactAttr}`);
   }

   if (item.children) {
     return keys.concat(this.getFlatKeys(item.children));
   }
   return keys;
 }, []);


 render() {
   //const { menuData } = getMenuData();
   return (
     <div id="content">
       <Switch>

         {this.getRoutes(getMenuData()).map(item => (
           <Route
             key={item.path}
             path={item.path}
             component={item.comp}
             exact={item.exact}
             redirectPath="/exception/403"
            />
         ))}

         <Route exact path="/" component={HomePage} />

         <Route render={NotFound} />
       </Switch>

     </div>
   );
 }
}

export default Content;
