import React, { Component } from 'react';

// tools
import moment from 'moment';
import XLSX from 'xlsx';

import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from 'antd';

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
  toExcel = () => {
    // 在实际的项目中，实际上这个功能是前端发送一个ajax请求到后端，然后后端返回一个文件下载的地址。
    // 组合数据
    const data = [Object.keys(this.state.dataSource[0])] // [['id', 'title', 'author', 'amount', 'createAt']]
    for (let i = 0; i < this.state.dataSource.length; i++) {
      // data.push(Object.values(this.state.dataSource[i]))
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 HH:mm:ss')
      ])
    }
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
  }
  render() {
    const dataSource = [
      {
        key: 1,
        name: 'jerry',
        age: 18,
        address: '朝阳'
      }
    ]
    const columns = [
      {
        title: '姓名',
      },
      {
        title: '年龄'
      }
    ]
    return (
      <Card title="文章列表" bordered={false} extra={<Button onClick={this.toExcel}>导出 excel</Button>}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            // current: this.state.offset / this.state.limited + 1,
            // total: this.state.total,
            // hideOnSinglePage: true,
            // showQuickJumper: true,
            // showSizeChanger: true,
            // onChange: this.onPageChange,
            // onShowSizeChange: this.onShowSizeChange,
            // pageSizeOptions: ['10', '15', '20', '30']
          }}></Table>
      </Card>
    );
  }
};

export default ArticleList;