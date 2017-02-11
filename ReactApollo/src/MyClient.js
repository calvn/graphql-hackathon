import React, { Component } from 'react'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

class MyClient extends Component {
  constructor (props) {
    super(props)
    console.info('MyClient props.serverUri', props.serverUri)

    this.client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: props.serverUri,
        opts: { cors: true }
      }),
      dataIdFromObject: r => r.id // Our backend has unique IDs, so we should use them for cache consistency
    })
    this
      .client
      .query({query: gql `
  query {
  __type(name: "MutationRoot") {
    fields {
      name
      args {
        type {
          name
          description
          inputFields {
            name
            description
            type {
              name
              description
              inputFields {
                name
                description
              }
            }
          }
        }
      }
    }
  }
}
`}).then((data) => {
  let Forms = {}

  const parseDescription = (str) => {
    var match = str && str.match('##(.*)##')
    if (match && match[1]) {
      try {
        return JSON.parse(match[1])
      } catch (e) {
        return {}
      }
    }
    return {}
  }

  const flatten = (memo, o) => {
    if (o.type && o.type.inputFields) {
      // call flatten on all the objects in inputFields
      var x = (item) => flatten(memo, item)
      o.type.inputFields.forEach(x)
    } else {
      // base case - parse description if it exists, create object, add it to memo, return memo
      var cool = parseDescription(o.description)
      memo.push({
        htmlType: 'text', // text, number, date
        htmlName: cool.name || o.name,
        htmlLabel: cool.label || o.name,
        htmlPlaceholder: cool.placeholder || o.name,
        hint: cool.placeholder || o.name,
        value: ''
      })
    }
    return memo
  }
  const makeForms = (form) => {
    debugger
    Forms[form.name] = form.args.reduce(flatten, [])
  }
  debugger

  data.data.__type.fields.forEach(makeForms)
})
  }

  render () {
    return (
      <ApolloProvider client={this.client}>
        {this.props.children}
      </ApolloProvider>
    )
  }
}

export default MyClient
