import React, { Component } from 'react';

import PageHeader from './PageHeader';

const content = {
  margin: '24px 24px 0'
};
/**
 * LAYOUT PATTERN -
 *
 * children - sub content
 *
 * restProps - extend props to sub compoenents
 *
 */

export default class PayeHeaderLayout extends Component {


  // static propTypes = {
  //   type: PropTypes.string,
  //   shape: PropTypes.oneOf(['circle', 'circle-outline']),
  //   size: PropTypes.oneOf(['large', 'default', 'small']),
  //   htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
  //   onClick: PropTypes.func,
  //   loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  //   className: PropTypes.string,
  //   icon: PropTypes.string,
  //   block: PropTypes.bool,
  // };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      children,
      wrapperClassName,
      top,
      ...restProps
    } = this.props;

    return (
      <div className={wrapperClassName}>
        {top}
        <PageHeader {...restProps} />
        {children ? <div className={content}>{children}</div> : null}
      </div>
    );
  }
}

