import React, { PureComponent, Fragment } from 'react';
import { Card, Steps, Breadcrumb } from 'antd';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import NotFound from '../../Exception/404';
import PageHeaderLayout from '../../../components/PageHeader/PageHeaderLayout';

import subRoutes from './routesStepform';
import { getRoutes } from '../../../utils/utils';


const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { match, routerData, location } = this.props;
    const breadcrumb = (
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>表单页</Breadcrumb.Item>
        <Breadcrumb.Item>分步表单</Breadcrumb.Item>
      </Breadcrumb>
    );
    return (
      <PageHeaderLayout
        title="分步表单"
        breadcrumb={breadcrumb}
        content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
       >

        <Card>
          <Fragment>
            <Steps current={this.getCurrentStep()}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            <br />

            <Switch>

              {getRoutes(subRoutes).map(item => (
                <Route
                  key={item.path}
                  path={`${match.url}/${item.path}`}
                  exact={item.exact}
                  component={item.comp}
              />
              ))}
              <Redirect exact from={`${match.url}`} to={`${match.url}/info`} />
              <Route render={NotFound} />


            </Switch>


          </Fragment>
        </Card>

      </PageHeaderLayout>


    );
  }
}
