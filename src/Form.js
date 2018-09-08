import React from 'react'
import * as Hola from './Hola'

export function FormNoDefault({ children }) {
  return <form onSubmit={e => e.preventDefault()}>{children}</form>
}

export function Field(props) {
  return (
    <p>
      <label>
        <span>{props.label}</span>
        {props.children}
      </label>
    </p>
  )
}

export function RangeInput({ min, max, step, value, onChange }) {
  return (
    <React.Fragment>
      <Hola.FormCtrl
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <Hola.FormCtrl
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </React.Fragment>
  )
}
