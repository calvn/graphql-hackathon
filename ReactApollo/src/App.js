import React, { Component } from 'react';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Explorer from './Explorer'
import InstaForm from './InstaForm'
import MyClient from './MyClient'
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
      nextServerUri: 'http://deadpool.graphql.tk:5000/graphql'
    }
    this.handleChangeTargetServer = this.handleChangeTargetServer.bind(this)
  }

  handleChangeTargetServer () {
    console.log('handleChangeTargetServer, this.state.nextServerUri:', this.state.nextServerUri)
    this.setState({ serverUri: this.state.nextServerUri })
  }

  render() {
    const childProps = {
      // TODO!!!
    }

    return (
      <div>
        {this.state.serverUri && <MyClient key={this.state.serverUri} serverUri={this.state.serverUri}>
          <Explorer
            value={this.state.nextServerUri}
            didChange={this.state.nextServerUri && this.state.nextServerUri === this.state.serverUri}
            onChange={(e) => { this.setState({ nextServerUri: e && e.target && e.target.value })}}
            onSubmit={this.handleChangeTargetServer}>
            <InstaForm {...childProps } />
          </Explorer>
        </MyClient>}
      </div>
    );
  }
}

export default App
