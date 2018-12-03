import React, { Component, Fragment } from 'react';

import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import { DataView } from '@antv/data-set';
import {
  Chart, Axis, Tooltip as BTooltip, Geom, Coord, Legend, Guide, Label
} from 'bizcharts';
import PageHeaderLayout from '../../components/PageHeader/PageHeaderLayout';

//https://bizcharts.net/products/bizCharts/api/tooltip

import ChartCard from '../../components/ChartCard';
import { getFakeChartData as data } from './chart';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Html } = Guide;

const yuan = val => `¥ ${numeral(val).format('0,0')}`;
//ALN: dangerouslySetInnerHTML 以html解析
const Yuan = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: yuan(children) }} /* eslint-disable-line react/no-danger */
  />
);

// @connect(({ chart, loading }) => ({
//   chart,
//   loading: loading.effects['chart/fetch'],
// }))
export default class Analysis extends Component {
  state = {
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  render() {
    //https://ant.design/components/grid-cn/#Col
    //响应式栅格
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    //https://bizcharts.net/products/bizCharts/api/chart#scale
    const scale = {
      x: {
        type: 'cat', //https://bizcharts.net/products/bizCharts/api/scale 分类
      },
      y: {
        min: 0,
      },
    };

    const scalePie = {
      x: {
        type: 'cat',
        range: [0, 1],
      },
      y: {
        min: 0,
      },
    };

    const padding = [36, 5, 30, 5];
    //tooltip内容样式
    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    //制作fake数据
    const rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      rankingListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234,
      });
    }

    //制作二级菜单
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );


    const dv = new DataView();
    dv.source(data.salesTypeData).transform({
      type: 'percent',
      field: 'y',
      dimension: 'x',
      as: 'percent',
    });

    return (
      <PageHeaderLayout
        title="图表及栅格系统体验..."

        content="React 的 组件化 封装 经典"
       >
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总销售额"
              //ALN: 可以让组件用户自己添加action
              action={(
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              )}
              total={() => <Yuan>126560</Yuan>}
              footer={`日均销售额：￥${numeral(12423).format('0,0')}`}
              contentHeight={46}
             />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="访问量"

              action={(
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              )}
              total={numeral(8846).format('0,0')}
              footer={`日访问量: ${numeral(1234).format('0,0')}`}
              contentHeight={46}
            >
              {/* content - 图表制作区  https://bizcharts.net/products/bizCharts/api/chart  */}

              <Chart
                scale={scale}
                height={54}
                forceFit
                data={data.visitData}
                padding={padding}
              >
                <BTooltip showTitle={false} crosshairs={false} />
                {/** https://bizcharts.net/products/bizCharts/api/geom#type type:图表类型 */}

                <Axis
                  key="axis-x"
                  name="x" //指定x轴 列
                  label={false}
                  line={false}
                  tickLine={false}
                  grid={false}
                />
                <Axis
                  key="axis-y"
                  name="y"
                  label={false}
                  line={false}
                  tickLine={false}
                  grid={false}
                />

                <Geom
                  type="area"
                  position="x*y"
                  shape="smooth"
                  style={{ fillOpacity: 1, }}
                  color="#975FE4"
                  tooltip={tooltip} />
              </Chart>


            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="支付笔数"

              action={(
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              )}
              total={numeral(6560).format('0,0')}
              footer="转化率: 60%"
              contentHeight={46}
            >
              {/* content - 图表制作区  https://bizcharts.net/products/bizCharts/api/chart  */}

              <Chart
                scale={scale}
                height={54}
                forceFit
                data={data.visitData}
                padding={padding}
              >
                <Tooltip showTitle={false} crosshairs={false} />
                <Geom type="interval" position="x*y" color="#975FE4" tooltip={tooltip} />
              </Chart>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="运营活动效果"

              action={(
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              )}
              total="78%"
              footer="周同比: 12%  日环比: 11%"
              contentHeight={46}
             />
          </Col>
        </Row>

        {/** ALN: Row Card是平级的 */}
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="销售额" key="sales">
                <Row>
                  {/** ALN: 控制row中每col占据宽度 */}
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>

                      {/** <Bar height={295} title="销售额趋势" data={salesData} />*/}
                      <h4 style={{ marginBottom: 20 }}>销售额趋势</h4>
                      <Chart
                        scale={scale}
                        height={295}
                        forceFit
                        data={data.salesData}
                        padding={padding || 'auto'}
                      >
                        <Axis
                          name="x"
                          title={false}
                          //label={autoHideXLabels ? false : {}}
                          //tickLine={autoHideXLabels ? false : {}}
                        />
                        <Axis name="y" min={0} />
                        <BTooltip showTitle={false} crosshairs={false} />
                        <Geom type="interval" position="x*y" color="rgba(24, 144, 255, 0.85)" tooltip={tooltip} />
                      </Chart>



                    </div>
                  </Col>

                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="访问量" key="views">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      TODO......
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
        {/** 分24 ， 每col 分 */}
        <Row gutter={24}>

          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card

              className={styles.salesCard}
              bordered={false}
              title="销售额类别占比"
              bodyStyle={{ padding: 24 }}
              extra={(
                <div className={styles.salesCardExtra}>
                  {iconGroup}
                  <div className={styles.salesTypeRadio}>
                    <Radio.Group>
                      <Radio.Button value="all">全部渠道</Radio.Button>
                      <Radio.Button value="online">线上</Radio.Button>
                      <Radio.Button value="offline">门店</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
                )}
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>



              <Chart
                scale={scalePie}
                height={248}
                forceFit
                data={dv}
                padding={padding}
                animate
                //onGetG2Instance={this.getG2Instance}
              >
                <Coord type="theta" radius={0.75} innerRadius={0.6} />

                <Legend
                  position="right"
                  offsetY={-window.innerHeight / 2 + 120}
                  offsetX={-100}
                />

                {/** 鼠标提示框 */}
                <BTooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                {/** 用于绘制图表的辅助元素 */}
                <Guide>
                  <Html
                    position={['50%', '50%']}
                    html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>类别</div>"
                    alignX="middle"
                    alignY="middle"
                  />
                </Guide>

                <Geom
                  style={{ lineWidth: 4, stroke: '#fff' }}
                  type="intervalStack"
                  position="percent"
                  tooltip={[
                    'x*percent',
                    (x, p) => ({
                      name: x,
                      value: `${(p * 100).toFixed(2)}%`,
                    }),
                  ]}
                  color="x"
                  //selected={selected}
                >
                  <Label
                    content="x"
                    formatter={(text, item, index) => {
                      // text 为每条记录 x 属性的值
                      // item 为映射后的每条数据记录，是一个对象，可以从里面获取你想要的数据信息
                      // index 为每条记录的索引
                      const point = item.point; // 每个弧度对应的点
                      let percent = point.percent;
                      percent = `${(percent * 100).toFixed(2)}%`;
                      return `${text} ${percent}`;
                    }}
                />
                </Geom>
              </Chart>


            </Card>
          </Col>
        </Row>

      </PageHeaderLayout>
    );
  }
}
