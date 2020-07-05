import React, { Component } from 'react'
import { Layout, Menu, Badge, Dropdown, Avatar } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Logo from './logo.png'
import './frame.less'

const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
  handleMenuClick = ({ key }) => {
    this.props.history.push(key)
  }
  render() {
    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3
    return (
      <Layout>
        <Header className="qua-header">
          <div className="qua-logo">
            <Link to="/" ><img src={Logo} alt="logo" /></Link>
          </div>
        </Header>
        <Content style={{ padding: '25px 25px' }}>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                selectedKeys={[selectedKeyArr.join('/')]}
                style={{ height: '100%', borderRight: 0 }}
                onClick={this.handleMenuClick}
              >
                {
                  this.props.menus.map(item => {
                    return (
                      <Menu.Item key={item.path}>
                        {item.icon}
                        {item.title}
                      </Menu.Item>
                    )
                  })
                }
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: "83vh" }}>{this.props.children}</Content>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default Frame