import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { adminRoutes } from './routes'
import { Frame } from './components'
const menus = adminRoutes.filter(route => route.isNav === true)

const mapStateProps = state => ({
  isLogin: state.user.isLogin,
  role: state.user.role,
})

// @connect(mapStateProps)
class App extends Component {
  render() {
    const { isLogin, role } = this.props
    return (
      true
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
                    render={(props) => {
                      // const hasPermission = route.roles.includes(role)
                      // return hasPermission ? <route.component {...props} /> : <Redirect to="/admin/noauth" />
                      return <route.component {...props} /> 
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