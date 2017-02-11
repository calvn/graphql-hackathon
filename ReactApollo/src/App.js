import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Explorer from './Explorer'
import InstaForm from './InstaForm'
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
      serverUri: 'http://deadpool.graphql.tk:5000/graphql'
    }

    const networkInterface = createNetworkInterface({
      uri: this.state.serverUri,
      opts: { cors: true }
    })

    this.client = new ApolloClient({
      networkInterface,

      // Our backend has unique IDs, so we should use them for cache consistency
      dataIdFromObject: r => r.id
    })
    this.handleChangeTargetServer = this.handleChangeTargetServer.bind(this)
  }

  handleChangeTargetServer () {
    console.log('handleChangeTargetServer, this.state.serverUri:', this.state.serverUri)

    const networkInterface = createNetworkInterface({
      uri: this.state.serverUri,
      opts: { cors: true }
    })
    this.client.destory()
    this.client = new ApolloClient({
      networkInterface,
      dataIdFromObject: r => r.id
    })
  }

  render() {
    const childProps = {
      // TODO!!!
    }

    return (
      <ApolloProvider client={this.client}>
        <Explorer
          value={this.state.serverUri}
          onChange={(e) => { this.setState({ serverUri: e && e.target && e.target.value })}}
          onSubmit={this.handleChangeTargetServer}>
          <InstaForm {...childProps } />
        </Explorer>
      </ApolloProvider>
    );
  }
}

export default App
