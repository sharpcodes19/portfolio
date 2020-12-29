import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import axios from 'axios'
import swal from 'sweetalert2'

import Server from '../../Server.json'
import Headings from './Headings'
import Form from './Form'

const Wrapper = styled.div `
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Section = styled.section `
  max-width: 500px;
  width: 100%;
`

function Login () {

  const location = useLocation ()
  const history = useHistory ()
  const [mobileNumber, setMobileNumber] = useState ('')
  const [password, setPassword] = useState ('')

  useEffect (() => {
    if (location.state && location.state.mobileNumber) {
      return setMobileNumber (location.state.mobileNumber)
    }

    const authToken = localStorage.getItem (Server.storage.authToken)
    if (authToken) {
      return axios.post (`${ Server.url }/a/auth`, { authToken })
      .then ((result) => {
        if (result.data.success) {
          setMobileNumber (result.data.mobileNumber)
        }
      })
    }
  }, [location.state])

  const handleMobileNumber = (value) => {
    setMobileNumber (value)
  }

  const handlePassword = (value) => {
    setPassword (value)
  }

  const onProceed = () => {

    swal.fire ({
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      title: 'Login',
      text: 'Authorizing credentials... Please wait while validating your mobile number.',
      icon: 'info',
      didOpen: async () => {
        swal.showLoading ()
        const result = await axios.post (`${ Server.url }/a/auth`, { mobileNumber, password })
        swal.close ()
        if (!result.data.success) {
          return swal.fire ({
            title: 'Login',
            text: 'Invalid mobile number or password were entered. Please try again.',
            icon: 'error',
            timer: 5000
          })
        }

        setMobileNumber (result.data.mobileNumber)
        localStorage.setItem (Server.storage.authToken, result.data.authToken)
        history.push ({
          pathname: '/',
          search: `ref=login`,
          state: { mobileNumber }
        })
      }
    })
  }

  return (
    <Wrapper>
      <Section>
        <Headings />
      </Section>
      <Section>
        <Form 
          mobileNumber = { mobileNumber }
          handleMobileNumber = { handleMobileNumber } 
          password = { password } 
          handlePassword = { handlePassword }
          onProceed = { onProceed }
        />
      </Section>
    </Wrapper>
  )
}

export default Login
