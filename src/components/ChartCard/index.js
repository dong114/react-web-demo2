import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';

import styles from './index.less';


//ALN: 可以让prop传递value or function
const renderTotal = (total) => {
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div className={styles.total}>{total()}</div>;
      break;
    default:
      totalDom = <div className={styles.total}>{total}</div>;
  }
  return totalDom;
};

const ChartCard = ({
  loading = false,
  contentHeight,
  title,
  avatar,
  action,
  total,
  footer,
  children,
  ...rest
}) => {
  const content = (
    <div className={styles.chartCard}>

      {/* 01 HEADER LINE    */}
      <div
        className={classNames(styles.chartTop)}
      >
        {/*
        <div
          className={classNames(styles.chartTop, {
            [styles.chartTopMargin]: !children && !footer,
          })}
          >
        ALN: 上面可以做到根据prop内容， 确定用不用具体的css    */}

        <div className={styles.metaWrap}>
          <div className={styles.meta}>
            <span className={styles.title}>{title}</span>
            <span className={styles.action}>{action}</span>
          </div>
          {renderTotal(total)}
        </div>
      </div>



      {/* 02 content    */}

      <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
        {children && (
          <div className={contentHeight && styles.contentFixed}>{children}</div>
        )}

      </div>


      {/* 03 footer    */}
      {footer && (
        <div
          className={classNames(styles.footer)}
        >
          {footer}
        </div>
      )}
    </div>
  );

  return (
    //...rest 继承父页面传递的所有props
    <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
      {content}
    </Card>
  );
};

export default ChartCard;
