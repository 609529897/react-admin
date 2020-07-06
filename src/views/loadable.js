// loadable 原理
import React, { Component } from 'react'

const Loadable = ({
  loader,
  loading: Loading
}) => {
  return class LoadableComponent extends Component {
    state = {
      LoadedComponent: null
    }
    componentDidMount() {
      // import('./Dashboard')
      loader()
        .then(resp => {
          this.setState({
            LoadedComponent: resp.default
          })
        })
    }
    render() {
      const {
        LoadedComponent
      } = this.state
      return (
        LoadedComponent
          ?
          <LoadedComponent />
          :
          <Loading />
      )
    }
  }
}
export default Loadable