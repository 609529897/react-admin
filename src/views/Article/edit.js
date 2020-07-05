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
    this.formRef = createRef()
    this.state = {
      isLoading: false
    }
  }
  onFinish = (values) => {
    const data = Object.assign({}, values, {
      createAt: values.createAt._d
    })
    this.setState({ isLoading: true })
    saveArticle(this.props.match.params.id, data)
      .then(resp => {
        message.success(resp.msg)
        this.props.history.push('/admin/article')
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }
  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      this.formRef.current.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }
  componentDidMount() {
    this.initEditor()
    this.setState({
      isLoading: true
    })
    getArticleById(this.props.match.params.id)
      .then(resp => {
        const { id, ...data } = resp
        data.createAt = moment(data.createAt)
        this.formRef.current.setFieldsValue(data)
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
            onFinish={this.onFinish}
            ref={this.formRef}
          >
            <br />
            <Form.Item
              label="标题"
              name="title"
              initialValue="初始值"
              rules={[
                {
                  required: true,
                  message: '标题是必填项!',
                }
              ]}>
              <Input placeholder="标题" />
            </Form.Item>
            <br />
            <Form.Item
              label="作者"
              name="author"
              initialValue="初始值"
              rules={[
                {
                  required: true,
                  message: '作者是必填项!',
                },
              ]}
            >
              <Input
                placeholder="作者"
              />
            </Form.Item>
            <br />
            <Form.Item
              label="阅读量"
              name="amount"
              initialValue="0"
              rules={[
                {
                  required: true,
                  message: '阅读量是必填项!',
                }, {
                  pattern: /[0-9]$/,
                  message: '阅读量必须是数值!',
                }, {
                  min: 0,
                  message: '阅读量不可以低于0!',
                },
              ]}
            >
              <Input
                placeholder="阅读量"
              />
            </Form.Item>
            <br />
            <Form.Item
              label="发布时间"
              name="createAt"
              rules={[
                {
                  required: true,
                  message: '时间是必填项!',
                },
              ]}
            >
              <DatePicker
                showTime
                placeholder="选择时间"
              />
            </Form.Item>
            <br />
            <Form.Item
              label="内容"
              name="content"
              rules={[
                {
                  required: true,
                  message: '内容是必填项!',
                },
              ]}
            >
            <div className="qua-editor" ref={this.editorRef}></div>
            </Form.Item>
            <br />
            <Form.Item wrapperCol={{ offset: 4 }}>
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