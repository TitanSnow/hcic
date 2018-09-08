import React from 'react'
import * as Hola from './Hola'
import { FormNoDefault, Field, RangeInput, SelectInput } from './Form'
import { isSupportWebP } from './features'

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
        <Field label="Format">
          <SelectInput
            options={[
              ...(isSupportWebP
                ? [{ value: 'image/webp', label: 'WebP' }]
                : []),
              { value: 'image/jpeg', label: 'JPEG' },
              { value: 'image/png', label: 'PNG' }
            ]}
            value={value.format}
            onChange={handleChange.bind(null, 'format')}
          />
        </Field>
      </FormNoDefault>
    </Hola.Card>
  )
}
