import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import Colors from '../../../Colors.json'
import TextField from '../../components/TextField'

const ColorScheme = Colors.netpay
const Wrapper = styled.div `

`

const Login = styled(Link) `
  margin: 0 0 0 2rem;
  font-family: Raleway, sans-serif;
  text-decoration: none;
  font-size: .8rem;
  font-weight: 600;
  color: ${ ColorScheme.danger };
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`

const Proceed = styled.button `
  margin: 1rem 0 0 0;
  width: 250px;
  height: 40px;
  background: ${ ColorScheme.primary };
  border: none;
  color: ${ ColorScheme.light };
  font-weight: 700;
  text-transform: uppercase;
  font-family: Raleway, sans-serif;
  cursor: pointer;
`

function MobileNumber (props) {

  const handleMobileNumber = (e) => {
    if (props.handleMobileNumber) {
      props.handleMobileNumber (e.target.value)
    }
  }

  return (
    <Wrapper>
      <TextField
        attrs = {{
          name: 'mobileNumber',
          type: 'text',
          placeholder: 'Enter mobile number',
          value: props.mobileNumber
        }}
        onChange = { handleMobileNumber }
      />
      <Proceed type = 'button' onClick = { props.onProceed }>Proceed</Proceed>
      <Login to = '/login'>or Login your account</Login>
    </Wrapper>
  )
}

export default MobileNumber
