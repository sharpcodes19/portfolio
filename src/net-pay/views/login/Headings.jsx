import React from 'react'
import styled from '@emotion/styled'
import Colors from '../../../Colors.json'

const ColorScheme = Colors.netpay

const Wrapper = styled.div `
  margin: 4rem 0;
`

const Title = styled.h1 `
  text-transform: uppercase;
  font-family: Raleway, sans-serif;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  font-size: 28px;
  color: ${ ColorScheme.dark };
`

const Subtitle = styled.p `
  
`

function Headings () {
  return (
    <Wrapper>
      <Title>Account Login</Title>
      <Subtitle>Enter your Login ID and Password to access your account.</Subtitle>
    </Wrapper>
  )
}

export default Headings
