import React from 'react'
import styled from '@emotion/styled'
import Colors from '../../../Colors.json'

const ColorScheme = Colors.netpay

const Wrapper = styled.div `
  display: flex;
  gap: .6rem;
  align-items: flex-end;
`

const Title = styled.h3 `
  font-family: Raleway, sans-serif;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  color: ${ ColorScheme.dark };
`

const Current = styled.p `
  font-size: .9rem;
`

function Step (props) {

  return (
    <Wrapper>
      <Title>Registration Step</Title>
      <Current>{ props.current } of 3</Current>
    </Wrapper>
  )
}

export default Step
