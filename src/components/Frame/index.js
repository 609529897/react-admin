import React, { Component } from 'react'
import { Layout, Menu, Badge, Dropdown, Avatar } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Logo from './logo.png'
import './frame.less'

const { Header, Content, Sider } = Layout

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length
  }
}

@connect(mapState)
@withRouter
class Frame extends Component {
  
  handleMenuClick = ({ key }) => {
    this.props.history.push(key)
  }

  onDropdownMenuClick = ({ key }) => {
    if (key === '/logout') {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }

  renderDropdown = () => (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item
        key="/admin/notifications"
      >
        <Badge dot={Boolean(this.props.notificationsCount)}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item
        key="/admin/profile"
      >
        个人设置
      </Menu.Item>
      <Menu.Item
        key="/logout"
      >
        退出登录
      </Menu.Item>
    </Menu>
  )
  render() {
    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3
    return (
      <Layout>
        <Header className="qua-header">
          <div className="qua-logo">
            <Link to="/" ><img src={Logo} alt="logo" /></Link>
          </div>
          <div>
            <Dropdown overlay={this.renderDropdown()}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <Avatar src={this.props.avatar} />&nbsp;&nbsp;
                <span>欢迎您！{this.props.displayName}</span>
                <Badge count={this.props.notificationsCount} offset={[-85, -10]}>
                  <DownOutlined />
                </Badge>
              </div>
            </Dropdown>
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