import React from 'react'
import styled from '@emotion/styled'
import Colors from '../../Colors.json'

const ColorScheme = Colors.netpay

const Wrapper = styled.div `
  border-bottom: 2px solid ${ ColorScheme.primary }
`

const Field = styled.input `
  width: 100%;
  background: transparent;
  border: none;
  padding: .7rem .7rem .5rem .7rem;
  font-family: 'Open Sans', sans-serif;
  font-size: .9rem;
`

function TextField (props) {
  return (
    <Wrapper>
      <Field { ...props.attrs } onChange = { props.onChange } />
    </Wrapper>
  )
}

export default TextField
