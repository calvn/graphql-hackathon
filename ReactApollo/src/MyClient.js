import React, { Component } from 'react'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

class MyClient extends Component {
  constructor(props) {
    super(props)
    console.info('MyClient props.serverUri', props.serverUri)

    this.client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: props.serverUri,
        opts: { cors: true }
      }),
      dataIdFromObject: r => r.id // Our backend has unique IDs, so we should use them for cache consistency
    })
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        {this.props.children}
      </ApolloProvider>
    );
  }
}

export default MyClient
