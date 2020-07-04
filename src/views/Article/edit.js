import React, { Component, createRef } from 'react'

import {
  Card,
  Button,
  Form,
  message,
  DatePicker,
  Input,
  Spin,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

// tools
import moment from 'moment'
import E from 'wangeditor'

import { getArticleById, saveArticle } from '../../requests'

import './edit.less'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

class Edit extends Component {
  constructor() {
    super()
    this.editorRef = createRef()
    this.state = {
      isLoading: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
          createAt: values.createAt.valueOf()
        })
        this.setState({
          isLoading: true
        })
        // 在这里可以处理更多想要处理的逻辑
        saveArticle(this.props.match.params.id, data)
          .then(resp => {
            message.success(resp.msg)
            // 如果需要是要跳转
            this.props.history.push('/admin/article')
          })
          .finally(() => {
            this.setState({
              isLoading: false
            })
          })
      }
    })
  }
  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      // html 即变化之后的内容
      this.props.form.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }
  componentDidMount() {
    // this.initEditor()
    this.setState({
      isLoading: true
    })
    getArticleById(this.props.match.params.id)
      .then(resp => {
        const { id, ...data } = resp
        data.createAt = moment(data.createAt)
        this.props.form.setFieldsValue(data)
        this.editor.txt.html(data.content)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }
  render() {
    return (
      <Card title="编辑文章" bordered={false} extra={<Button onClick={this.props.history.goBack}>取消</Button>}>
        <Spin spinning={this.state.isLoading}>
          <Form
            {...formItemLayout}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onSubmit={this.handleSubmit}
          // onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                保存修改
        </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default Edit