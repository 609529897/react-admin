import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { } from '../../actions/notifications';
import { } from '../../actions/user';
import { adminRoutes } from '../../routes';

import Logo from './logo.png';
import './frame.less';

const { Header, Content, Sider } = Layout;

class Frame extends Component {
  render() {
    return (
      <Layout>
        <Header className="qua-header">
          <div className="qua-logo">
            <img src={Logo} alt="logo" />
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.props.menus.map(item => {
                  return (
                    <Menu.Item key={item.path === 'admin/dashboard' ? 1 : item.path}>
                      {item.icon}
                      {item.title}
                    </Menu.Item>
                  )
                })
              }

            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  };
};

export default Frame;