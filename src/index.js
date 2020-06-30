import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import zhCN from 'antd/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'antd'

import store from './store'
import { mainRoutes } from './routes'
import App from './App'
import './index.less'

render(
  // <Provider store={store}>
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route path="/admin" render={(props) => {
          // TODO: 权限，需要登录才能访问 admin
          return <App {...props} />
        }} />
        {
          mainRoutes.map(route => {
            return <Route key={route.path} path={route.path} component={route.component} />
          })
        }
        <Redirect to="/admin" from="/" exact/>
        <Redirect to="/404" />
      </Switch>
    </Router>
  </ConfigProvider>
  // </Provider>
  , document.querySelector('#root'))