import React from 'react'
import * as Hola from './Hola'
import { FormNoDefault, Field, RangeInput } from './Form'

export default function ConfigCard({ value, onChange }) {
  function handleChange(name, v) {
    onChange({ ...value, [name]: v })
  }
  return (
    <Hola.Card>
      <FormNoDefault>
        <Field label="Quality">
          <RangeInput
            min="0"
            max="1"
            step="0.01"
            value={value.quality}
            onChange={handleChange.bind(null, 'quality')}
          />
        </Field>
        <Field label="Scale">
          <RangeInput
            min="0"
            max="2"
            step="0.01"
            value={value.scale}
            onChange={handleChange.bind(null, 'scale')}
          />
        </Field>
      </FormNoDefault>
    </Hola.Card>
  )
}
