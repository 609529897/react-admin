import React, { Component } from 'react'

// tools
import moment from 'moment'
import XLSX from 'xlsx'

import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from 'antd'

import { getArticles, deleteArticleById } from '../../requests'

const ButtonGroup = Button.Group

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}

class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10,
      deleteArticleTitle: '',
      isShowArticleModal: false,
      deleteArticleConfirmLoading: false,
      deleteArticleID: null
    }
  }

  onPageChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
      this.getData()
    })
  }

  onShowSizeChange = (current, size) => {
    // 这里出去和产品聊的时候必须仔细问清楚需求，究竟是回到第一页还是留在当前页，问清楚，
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getData()
    })
  }

  toExcel = () => {
    const state = this.state
    // 在实际的项目中，实际上这个功能是前端发送一个ajax请求到后端，然后后端返回一个文件下载的地址。
    // 组合数据
    const data = [Object.keys(state.dataSource[0])] // [['id', 'title', 'author', 'amount', 'createAt']]
    for (let i = 0; i < state.dataSource.length; i++) {
      // data.push(Object.values(this.state.dataSource[i]))
      data.push([
        state.dataSource[i].id,
        state.dataSource[i].title,
        state.dataSource[i].author,
        state.dataSource[i].amount,
        moment(state.dataSource[i].createAt).format('YYYY年MM月DD日 HH:mm:ss')
      ])
    }
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, `articles-${state.offset / state.limited + 1}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
  }

  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const { amount } = record
            // 这里是根据一个数字的大小做一个条件渲染
            // 同理，可以做职位级别不同的颜色
            // 总经理：'001'，经理：'002'，主管: '003' 
            // const titleMap = {
            //   '001': 'red',
            //   '002': '#09f',
            //   '003': 'green'
            // }
            // return <Tag color={titleMap[titleKey]}>{record.title}</Tag>
            return (
              <Tooltip title={amount > 8000 ? '超过8000' : '没超过8000'}>
                <Tag color={amount > 8000 ? 'red' : 'green'}>{record.amount}</Tag>
              </Tooltip>
            )
          }
        }
      }
      if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const { createAt } = record
            return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={this.toEdit.bind(this, record.id)}>编辑</Button>
            <Button size="small" type="danger" onClick={this.showDeleteArticleModal.bind(this, record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }


  toEdit = (id) => {
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  showDeleteArticleModal = (record) => {
    // 使用函数的方式调用，定制化没那么强
    // Modal.confirm({
    //   title: '此操作不可逆，请谨慎！！！',
    //   content: <Typography>确定要删除<span style={{color: '#f00'}}>{record.title}</span>吗？</Typography>,
    //   okText: '别磨叽！赶紧删除！',
    //   cancelText: '我点错了！',
    //   onOk() {
    //     deleteArticle(record.id)
    //       .then(resp => {
    //         console.log(resp)
    //       })
    //   }
    // })
    this.setState({
      isShowArticleModal: true,
      deleteArticleTitle: record.title,
      deleteArticleID: record.id
    })
  }

  deleteArticle = () => {
    const state = this.state
    this.setState({
      deleteArticleConfirmLoading: true
    })
    deleteArticleById(state.deleteArticleID)
      .then(resp => {
        message.success(resp.msg)
        // 这里沟通的时候有坑，究竟是留在当前页还是到第一页？？？
        // 这里的需求是到一页
        this.setState({
          offset: 0
        }, () => {
          this.getData()
        })
      })
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false,
          isShowArticleModal: false
        })
      })
  }

  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticleTitle: '',
      deleteArticleConfirmLoading: false
    })
  }

  getData = () => {
    const state = this.state
    this.setState({ isLoading: true })
    getArticles(state.offset, state.limited)
      .then(resp => {
        const columnKeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnKeys)
        // 如果请求完成之后组件已经销毁，就不需要再setState
        // this.updater.isMounted(this) 返回 fasle 表示组件已经被销毁
        if (!this.updater.isMounted(this)) return
        this.setState({
          total: resp.total,
          dataSource: resp.list,
          columns,
        })
      })
      .catch(err => console.log(err))
      // 不管结果如何 finally 都会执行
      .finally(() => {
        if (!this.updater.isMounted(this)) return
        this.setState({
          isLoading: false,
        })
      })
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    const state = this.state;
    return (
      <Card title="文章列表" bordered={false} extra={<Button onClick={this.toExcel}>导出 excel</Button>}>
        <Table
          rowKey={record => record.id}
          dataSource={state.dataSource}
          columns={state.columns}
          pagination={{
            current: state.offset / state.limited + 1,
            total: state.total,
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            pageSizeOptions: ['10', '15', '20', '30']
          }} />
        <Modal
          title='此操作不可逆，请谨慎！！！'
          visible={state.isShowArticleModal}
          onCancel={this.hideDeleteModal}
          confirmLoading={state.deleteArticleConfirmLoading}
          onOk={this.deleteArticle}
        >
          <Typography>
            确定要删除<span style={{ color: '#f00' }}>{state.deleteArticleTitle}</span>吗？</Typography>
        </Modal>
      </Card>
    )
  }
}

export default ArticleList