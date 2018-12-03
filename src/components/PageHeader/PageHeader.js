import React, { Component } from 'react';


import styles from './PageHeader.less';

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, breadcrumb, content } = this.props;
    return (
      <div className={styles.pageHeader}>
        {breadcrumb}
        <div>
          <div className={styles.indexTitle}>
            <span>{title}</span>
          </div>
          <div className={styles.indexRow}>
            <span>
              {content}
            </span>
          </div>

        </div>
      </div>
    );
  }
}


export default PageHeader;
