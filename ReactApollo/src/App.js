import React, { Component } from 'react';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Explorer from './Explorer'
import InstaForm from './InstaForm'
import MyClient from './MyClient'
import withValidations from 'react-validate-hoc'
import { colorFg, colorBg, colorBg2 } from './_config'

const Layout = ({ children }) => (
  <div>{Object.assign({}, children, {
    // TODO!!!
  })}</div>
)

class App extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      serverUri: 'http://deadpool.graphql.tk:5000/graphql',
      nextServerUri: 'http://deadpool.graphql.tk:5000/graphql',
      childProps: { validations: {} }
    }
    this.handleChangeTargetServer = this.handleChangeTargetServer.bind(this)
  }

  handleChangeTargetServer () {
    console.log('handleChangeTargetServer, this.state.nextServerUri:', this.state.nextServerUri)
    this.setState({
      serverUri: this.state.nextServerUri,
      childProps: { validations: {} }
    })
  }

  render() {
    return (
      <div>
        {this.state.serverUri && <MyClient
          key={`MyClient-${this.state.serverUri}`}
          serverUri={this.state.serverUri}
          handleReceive={(nextChildProps) => {
            this.setState({ childProps: nextChildProps })
          }}>
          <Explorer
            key={`Explorer-${this.state.serverUri}`}
            value={this.state.nextServerUri}
            didChange={this.state.nextServerUri && this.state.nextServerUri === this.state.serverUri}
            onChange={(e) => { this.setState({ nextServerUri: e && e.target && e.target.value })}}
            onSubmit={this.handleChangeTargetServer}>
            {this.state.childProps && this.state.childProps.fields && this.state.childProps.fields.length > 0 && <InstaForm {...this.state.childProps } />}
          </Explorer>
        </MyClient>}
      </div>
    );
  }
}

export default App
