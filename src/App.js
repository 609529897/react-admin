import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { adminRoutes } from './routes'
import { Frame } from './components'
const menus = adminRoutes.filter(route => route.isNav === true)

const mapState = state => ({
  isLogin: state.user.isLogin,
  role: state.user.role,
})

@connect(mapState)
class App extends Component {
  render() {
    const prosp = this.props
    return (
      prosp.isLogin
        ?
        <Frame menus={menus}>
          <Switch>
            {
              adminRoutes.map(route => {
                return (
                  <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    render={(routerProps) => {
                      const hasPermission = route.roles.includes(prosp.role)
                      return hasPermission ? <route.component {...routerProps} /> : <Redirect to="/admin/noauth" />
                    }}
                  />
                )
              })
            }
            <Redirect to={adminRoutes[0].path} from='/admin' exact />
            <Redirect to="/404" />
          </Switch>
        </Frame>
        :
        <Redirect to="/login" />
    )
  }
}

export default App