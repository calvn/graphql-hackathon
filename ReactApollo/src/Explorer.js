import React, { Component } from 'react'
import { Triangle } from 'reline'
import { colorFg, colorBg, colorBg2 } from './_config'

const Explorer = (props) => {
  const { inputValue, onInputChange, onSubmit, location: { query: { url } }, children, ...rest } = props

  const styles = {
    explorer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '1rem 0',
      width: '100%',
      minHeight: '100%',
      backgroundColor: colorBg,
      color: colorFg
    },
    header: {
      margin: '0 0 1rem',
      color: colorFg,
      font: 'normal 2rem/2rem Futura'
    },
    intro: {
      margin: '0 0 1rem',
      maxWidth: '30rem',
      color: colorFg,
      font: 'normal 1rem Futura',
      textAlign: 'center'
    },
    inside: {
      flex: '1 auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      margin: '1em'
    },
    card: {
      flex: '1 1 40rem',
      maxWidth: '40rem',
      padding: '0.5rem',
      backgroundColor: colorBg2,
      border: `1px solid ${colorFg}`
    },
    form: {
      display: 'flex',
      margin: '0 0 1em'
    },
    input: {
      flex: 1,
      margin: 0,
      padding: '0.5em 0.75em',
      background: colorBg,
      border: `1px solid ${colorFg}`,
      borderRight: 0,
      borderRadius: 0,
      color: colorFg,
      outline: 'none'
    },
    inputButton: {
      flex: '0 1 auto',
      margin: 0,
      padding: '0.5rem 0.75rem',
      background: colorBg,
      border: `1px solid ${colorFg}`,
      borderRadius: 0,
      color: colorFg,
      Explorerearance: ''
    }
  }

  return (
    <div style={styles.explorer}>
      <div style={styles.header}>{`GraphQL <InstaForm />`}</div>
      <div style={styles.intro}>
        Automatic forms for GraphQL APIs, with client-side validation defined by your GraphQL schemas. Made hastily by Calvin, Harsh, Theo, and Eric.
      </div>
      <form onSubmit={onSubmit} action='javascript:' style={styles.form}>
        <input
          name='network_interface_uri'
          placeholder='http://localhoost:5000'
          value={url || inputValue}
          style={styles.input}
          onChange={onInputChange} />
        <button type='submit' style={styles.inputButton}>
          <Triangle title='Go' />
        </button>
      </form>
      <div style={styles.inside}>
        <div style={styles.card}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Explorer
