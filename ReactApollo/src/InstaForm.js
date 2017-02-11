import React, { Component } from 'react'
import TypeWriter from 'react-typewriter'
import withValidations from 'react-validate-hoc'
import { colorFg, colorBg, colorLabel } from './_config'

class InstaForm extends Component {
  render() {
    const {
      errors = {},
      fields = [
        {
          htmlType: 'text',
          htmlName: 'cool_thing_name',
          htmlLabel: 'Name a cool thing',
          htmlPlaceholder: 'Name a cool thing',
          hint: 'Press buttons on the key board til it looks 💯',
          value: ''
        },
        {
          htmlType: 'text',
          htmlName: 'cool_author',
          htmlLabel: 'What’s your name',
          htmlPlaceholder: 'Rhee Hakt',
          hint: 'feel free 2 lie',
          value: ''
        }
      ],
      onSubmit = (e) => { e.preventDefault(); console.log(e); },
      children,
      ...rest
    } = this.props

    const styles = {
      form: {
        flex: '1 1 40rem',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      },
      row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginBottom: '1rem',
        color: colorLabel
      },
      icon: {
        flex: '0 0 3rem',
        marginRight: '0.4rem',
        borderRadius: '0.35rem'
      },
      label: {
        margin: 0,
        width: '100%',
        height: '1.25em',
        fontSize: '1.25em',
        fontWeight: 600
      },
      input: {
        flex: '1 1 auto',
        margin: '0.138rem 0',
        padding: '0.5rem 0.75rem',
        background: colorBg,
        border: `1px solid ${colorLabel}`,
        color: colorLabel,
        borderRadius: 2
      },
      hint: {
        margin: 0,
        opacity: 0.7,
      },
      actions: {
        textAlign: 'right',
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }

    return (
      <form onSubmit={onSubmit} action='javascript:' style={styles.form} {...rest}>
        {fields && Array.isArray(fields) && fields.map(({
          htmlType,
          htmlName,
          htmlLabel,
          htmlPlaceholder,
          hint,
          value
        }) => <div key={htmlName} style={styles.row}>
          <label htmlFor={htmlName} style={styles.label}>
            <TypeWriter typing={1}>
              {htmlLabel}
            </TypeWriter>
          </label>
          <input
            type={htmlType}
            name={htmlName}
            defaultValue={value}
            placeholder={htmlPlaceholder}
            style={styles.input}
            />
          {hint && <p style={styles.hint}>{hint}</p>}
          {errors.username && (
            <span>{errors.username}</span>
          )}
        </div>)}
        <div style={styles.actions}>
          <button type='submit' style={styles.input}>Submit</button>
        </div>
        {children}
      </form>
    )
  }
}

export default InstaForm
