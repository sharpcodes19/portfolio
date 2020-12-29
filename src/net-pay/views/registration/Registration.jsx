import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Redirect, useHistory } from 'react-router-dom'

import Brand from './Brand'
import Step from './Step'
import Form from './MobileNumber'
import Headings from './Headings'
import TermsAndConditions from './TermsAndConditions'
import Password from './Password'
import Server from '../../Server.json'

import swal from 'sweetalert2'
import axios from 'axios'

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


function Registration () {

  const [currentStep, setCurrentStep] = useState (1)
  const [mobileNumber, setMobileNumber] = useState ('')
  const [authToken, setAuthToken] = useState ('')
  const [password, setPassword] = useState ('')

  const history = useHistory ()

  const handleProcceed = () => {
    setCurrentStep (currentStep + 1)
  }

  const handleCancel = () => {
    setCurrentStep (currentStep - 1)
  }

  const handleMobileNumber = (value) => {
    setMobileNumber (value)
  }

  const handlePassword = (value) => {
    setPassword (value)
  }

  const handleSubmit = () => {
    swal.fire ({
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      title: 'Validating...',
      text: 'Please wait while we are checking your mobile number...',
      icon: 'info',
      didOpen: async () => {
        swal.showLoading ()
        try {
          const result = await axios.post (`${ Server.url }/a/check-mobile`, { mobileNumber })

          if (!result.data.success) {
            swal.close ()
            return history.push ('/403')
          }
          const authToken = result.data.authToken
          setAuthToken (authToken)
          if (!authToken) {
            swal.close ()
            return swal.fire ({
              icon: 'warning',
              title: 'Mobile verification',
              text: `${ mobileNumber } is not valid or already taken.`
            })
          }
          swal.close ()
          setCurrentStep (currentStep + 1)
        } catch (ex) {
          console.error (ex.message || ex)
        }
      }
    })
  }

  const handleRegister = async () => {
    swal.fire ({
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      title: 'Registering account',
      text: 'Please wait while we are registering your account...',
      icon: 'info',
      didOpen: async () => {
        swal.showLoading ()
        try {
          const result = await axios.post (`${ Server.url }/a/create-account`, { authToken, mobileNumber, password })
          
          if (!result.data.success) {
            swal.close ()
            return swal.fire ({
              title: 'Registration',
              text: result.data.message || 'We cannot process your registration now. Please try again later.',
              icon: 'warning',
              showCancelButton: false
            })
          }
          localStorage.setItem (Server.storage.authToken, result.data.authToken)
          swal.close ()
          history.push ({
            pathname: '/login',
            state: { mobileNumber }
          })
        } catch (ex) {
          console.error (ex.message || ex)
          swal.close ()
        }
      }
    })
  }

  return (
    <Wrapper>
      <Section>
        <Brand />
        <Step current = { currentStep } />
      </Section>
      <Section>
        <Headings currentStep = { currentStep } />
        {
          currentStep === 1 ?
            <Form 
              onProceed = { handleProcceed } 
              onSubmit = { handleSubmit }
              handleMobileNumber = { handleMobileNumber }
              mobileNumber = { mobileNumber }
            /> :
          currentStep === 2 ?
            <TermsAndConditions 
              onBack = { handleCancel }
              onSubmit = { handleSubmit }
            /> :
          currentStep === 3 ?
            <Password 
              onSubmit = { handleRegister }
              handlePassword = { handlePassword }
            />
          : <Redirect path = '/login' />
        }
      </Section>
      <Section></Section>
    </Wrapper>
  )
}

export default Registration
