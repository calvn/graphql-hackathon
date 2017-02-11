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

// Replace this Uri with your GraphQL server Uri
const serverUri = 'http://deadpool.graphql.tk:5000/graphql'

class App extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      inputValue: ''
    }

    const networkInterface = createNetworkInterface({
      uri: serverUri,
      opts: { cors: true }
    })

    this.client = new ApolloClient({
      networkInterface,

      // Our backend has unique IDs, so we should use them for cache consistency
      dataIdFromObject: r => r.id
    })
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Router history={browserHistory}>
          <Route path="/" component={Explorer}>
            <Route component={Layout}>
              <IndexRoute component={InstaForm} />
            </Route>
          </Route>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App
