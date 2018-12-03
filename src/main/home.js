import React, { Component } from 'react';

import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from 'bizcharts';
import DataSet from '@antv/data-set';
import { getFakeChartData as fakedata } from '../routes/Dashboard/chart';
import styles from './home.less';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const data = fakedata.offlineChartData;

    data.sort((a, b) => a.x - b.x);

    let max;
    if (data[0] && data[0].y1 && data[0].y2) {
      max = Math.max(
        [...data].sort((a, b) => b.y1 - a.y1)[0].y1,
        [...data].sort((a, b) => b.y2 - a.y2)[0].y2
      );
    }

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    //https://bizcharts.net/products/bizCharts/api/transform#fold-%E5%AD%97%E6%AE%B5%E5%B1%95%E5%BC%80

    dv.transform({
      type: 'map', //生成新行
      callback(row) {
        const newRow = { ...row };
        newRow['客流量'] = row.y1;
        newRow['支付笔数'] = row.y2;
        return newRow;
      },
    })
      .transform({
        type: 'fold',
        fields: ['客流量', '支付笔数'], // 展开字段集
        key: 'key', //线的类型 key字段
        value: 'value' // value字段
      //retains: [ 'x' ]        // 保留字段集，默认为除 fields 以外的所有字段
      });
    console.log(dv);
    /*
      dv.rows 变为
      [   key-line        y1/y2         x
        { key: gold, value: 10, country: "USA" },
        { key: silver, value: 20, country: "USA" },
        { key: gold, value: 7, country: "Canada" },
        { key: silver, value: 26, country: "Canada" }
      ]
      */

    const timeScale = {
      type: 'time',
      tickInterval: 60 * 60 * 1000,
      mask: 'HH:mm',
      range: [0, 1],
    };

    const cols = {
      x: timeScale,
      value: {
        max,
        min: 0,
      },
    };

    return (
      <div className={styles.timelineChart} style={{ height: '100%' }}>
        <div className={styles.home}>
          <h2>多条折线图Demo - 感受bizcharts的魅力</h2>
          <Chart height={400} data={dv} scale={cols} forceFit>
            <Legend />
            <Axis name="x" />
            {/**
            <Axis
              name="x"
              label={{
                formatter: val => `${val}°C`
              }}
            /> */}
            <Tooltip
              crosshairs={{
                type: 'y'
              }}
          />
            <Geom
              type="line"
              position="x*value"
              size={2}
              color="key"
          />
            <Geom
              type="line"
              position="x*value"
              size={1}
              shape="circle"
              color="key"
              // style={{
              //   stroke: '#fff',
              //   lineWidth: 1
              // }}
          />
          </Chart>
        </div>
      </div>
    );
  }
}


export default HomePage;
