import React, { Component, createRef } from 'react'

import {
  Card,
  Button,
  Form,
  DatePicker,
  Input,
  Spin,
  message
} from 'antd'

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
  render() {
    return (
      <Card title="编辑文章" bordered={false} extra={<Button onClick={this.props.history.goBack}>取消</Button>}>
        <Spin spinning={this.state.isLoading}>

        </Spin>
      </Card>
    )
  }
}

export default Edit