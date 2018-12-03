import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      // this.isMounted = true;
      const { default: component } = await importComponent();
      // if (this.isMounted) {
      this.setState({
        component
      });
      // }
    }

    componentWillUnmount() {
      // this.isMounted = false;
      //组件被销毁之前重写setState方法 不对状态做任何改变
      this.setState = (state, callback) => {
        console.log("Warning: Can't call setState (or forceUpdate) ");
      };
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
