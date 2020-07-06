import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'

import './login.less'


const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})

@connect(mapState, { login })
class Login extends Component {
  onFinish = values => {
    this.props.login(values)
  }
  render() {
    return (
      this.props.isLogin
        ?
        <Redirect to='/admin' />
        :
        <Card title="QUA Admin" className="qua-login-wrapper">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            >
              <Input
                disabled={this.props.isLoading}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            >
              <Input
                disabled={this.props.isLoading}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox disabled={this.props.isLoading}>记住账号</Checkbox>
              </Form.Item>
              <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button>
            </Form.Item>
          </Form>
        </Card>
    )
  }
}

export default Login