import React from 'react'

export function Component(props) {
  const {is, extra = [], children, Tag = 'div', ...extraProps} = props
  const className = [is, ...extra].map(cn => `hola-${cn}`).join(' ')
  return <Tag {...extraProps} className={className}>{children}</Tag>
}

export function Container(props) {
  return <Component {...props} is="container"/>
}

export function Columns(props) {
  return <Component {...props} is="columns"/>
}

export function ColumnsItem(props) {
  return <Component {...props} is="columns-item"/>
}

export function Card(props) {
  return <Component {...props} is="card"/>
}

export function ColumnsCardStack(props) {
  return <Columns {...props} extra={[...(props.extra || []), 'card-stack']}/>
}

export function FormCtrl(props) {
  return <Component {...props} is="form-ctrl" Tag={props.Tag || 'input'} />
}
