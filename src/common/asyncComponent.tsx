import React, { Component } from 'react'

interface IAsyncComponent {
  Component: any
}

// 动态异步加载组件模块高阶组件
export const asyncComponent = loadComponent => (

  class AsyncComponent extends Component<any, IAsyncComponent> {
    constructor(props) {
      super(props)
      this.state = {
        Component: null
      }
      this.hasLoadedComponent = this.hasLoadedComponent.bind(this)
    }

    componentDidMount() {
      if (this.hasLoadedComponent()) {
        return null
      }

      loadComponent()
        .then(module => module.default ? module.default : module)
        .then(Component => {
          this.setState({
            Component
          })
        })
        .catch(error => {
          throw new Error('cannot load Component in <AsyncComponent>')
        })
    }

    hasLoadedComponent() {
      return this.state.Component !== null
    }

    render() {
      const { Component } = this.state
      return Component ? <Component {...this.props} /> : null
    }
  }
)
