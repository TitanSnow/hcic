import React from 'react'
import * as Hola from './Hola'
import { FormNoDefault, Field, RangeInput } from './Form'

export default function ConfigCard({ value, onChange }) {
  function NamedRangeInput(props) {
    const { name, ...extraProps } = props
    function handler(v) {
      onChange({ ...value, [name]: v })
    }
    return <RangeInput {...extraProps} value={value[name]} onChange={handler} />
  }
  return (
    <Hola.Card>
      <FormNoDefault>
        <Field label="Quality">
          <NamedRangeInput name="quality" min="0" max="1" step="0.01" />
        </Field>
      </FormNoDefault>
    </Hola.Card>
  )
}
