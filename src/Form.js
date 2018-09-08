import React from 'react'
import * as Hola from './Hola'

function preventDefault(e) {
  e.preventDefault()
}

export function FormNoDefault({ children }) {
  return <form onSubmit={preventDefault}>{children}</form>
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
  function onValueChange(e) {
    onChange(Number.parseFloat(e.target.value))
  }
  return (
    <React.Fragment>
      <Hola.FormCtrl
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onValueChange}
      />
      <Hola.FormCtrl
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onValueChange}
      />
    </React.Fragment>
  )
}
