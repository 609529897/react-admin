import React, { Component, createRef } from 'react'
import {
  Card,
  Row,
  Col,
  Spin
} from 'antd'
import { ReadOutlined, SmileOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

import echarts from 'echarts'

import { getArticleAmount } from '../../requests'

import './dashboard.less'


class Dashboard extends Component {
  constructor() {
    super()
    this.articleAmount = createRef()
    this.state = {
      isLoadding: false
    }
  }
  initArticleChart = () => {
    this.setState({ isLoadding: true })
    this.articleChart = echarts.init(this.articleAmount.current)
    getArticleAmount()
      .then(resp => {
        this.setState({ isLoadding: false })
        const option = {
          grid: {
            left: '10',
            right: '10',
            bottom: '10',
            top: '10',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: resp.amount.map(item => item.month)
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: resp.amount.map(item => item.value),
            type: 'line',
            areaStyle: {}
          }]
        }
        this.articleChart.setOption(option)
      })
  }
  componentDidMount() {
    this.initArticleChart()
  }
  render() {
    return (
      <>
        <Card
          title="概览"
          bordered={false}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="qua-gutter-box" style={{ backgroundColor: '#29B6F6' }}>
              <ReadOutlined className='icon'/>
              总预览 300k</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qua-gutter-box" style={{ backgroundColor: '#AB47BC' }}><SmileOutlined className='icon'/>总客户 8k+</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qua-gutter-box" style={{ backgroundColor: '#FF7043' }}><CaretUpOutlined className='icon'/>阅读 8000+ 的文章 0.8k</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qua-gutter-box" style={{ backgroundColor: '#43A047' }}><CaretDownOutlined className='icon'/>阅读 8000- 的文章 2.2k</div>
            </Col>
          </Row>
        </Card>
        <Card
          title="最近浏览量"
          bordered={false}
        >
          <Spin spinning={this.state.isLoadding}>
            <div ref={this.articleAmount} style={{ height: '400px' }} />
          </Spin>
        </Card>
      </>
    )
  }
}

export default Dashboard