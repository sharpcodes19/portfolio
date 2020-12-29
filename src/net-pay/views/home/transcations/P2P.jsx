import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

import axios from 'axios'
import swal from 'sweetalert2'

import Server from '../../../Server.json'
import Colors from '../../../../Colors.json'
import TextField from '../../../components/TextField'

const ColorScheme = Colors.netpay
const Wrapper = styled.div `
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem 0;
`

const Control = styled.div `
  padding: .5rem 0;
  display: flex;
  align-items: center;
`

const Back = styled(Link) `
  display: flex;
  gap: .5rem;
  align-items: center;
  color: ${ ColorScheme.primary };
  font-weight: 700;
  font-size: .9rem;
  font-family: Raleway, sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  padding: .5rem 2rem .5rem 0;
`

const Title = styled.h2 `
  text-transform: uppercase;
  margin: 0 0 .5rem 0;
`

const Form = styled.form `
  width: 200px;
  margin: 3rem 0 0 0;
`

const Subtitle = styled.p `
  font-size: .9rem;
`

const Submit = styled.button `
  width: 100%;
  margin: 1rem 0 0 0;
  height: 40px;
  background: ${ ColorScheme.primary };
  border: none;
  color: ${ ColorScheme.light };
  font-weight: 700;
  text-transform: uppercase;
  font-family: Raleway, sans-serif;
  cursor: pointer;
`

function Bank() {

  const [authToken, setAuthToken] = useState ('')
  const [mobileNumber, setMobileNumber] = useState (0)
  const history = useHistory ()

  useEffect(() => {
    const authToken = localStorage.getItem (Server.storage.authToken)
    if (!authToken) {
      return history.push ('/login')
    }

    axios.post (`${ Server.url }/a/auth`, { authToken })
    .then ((result) => {
      if (!result.data.success) {
        return history.push ('/login')
      }
      localStorage.setItem (Server.storage.authToken, result.data.authToken)
      setAuthToken (result.data.authToken)
      setMobileNumber (result.data.mobileNumber)
    }).catch ((ex) => {
      console.error (ex.message || ex)
      history.push ('/login')
    })
  }, [history, authToken, mobileNumber])

  const onSubmit = (e) => {
    e.preventDefault ()

    const amount = e.target.amount.value
    if (!parseFloat (amount)) {
      return swal.fire ({
        title: 'Validation',
        text: 'Invalid amount value',
        icon: 'error',
        showCancelButton: false
      })
    }

    swal.fire ({
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      title: 'Transaction',
      text: 'Adding your transaction data. Please wait...',
      icon: 'info',
      didOpen: async () => {
        swal.showLoading ()

        const formattedAmount = new Intl.NumberFormat ('en-PH', {
          style: 'currency',
          currency: 'PHP'
        }).format (amount)
        const message = `${ mobileNumber } requested ${ formattedAmount }.`
        const status = 'Pending'
        const type = 'p2p'

        try {
          const result = await axios.post (`${ Server.url }/t/add-entry`, { authToken, amount, message, type, status })
          if (!result.data.success) {
            swal.close ()
            return swal.fire ({
              title: 'Transaction',
              text: result.data.message || 'We cannot process your transaction now. Please try again later.',
              icon: 'warning',
              showCancelButton: false
            })
          }
          const popup = await swal.fire ({
            title: 'Transaction',
            text: 'Process completed your entry will be recorded into your transactions.',
            icon: 'success',
            timer: 5000
          })
          if (popup) return history.push ('/')
        } catch (ex) {
          console.error (ex.message || ex)
          swal.close ()
          history.push ('/500')
        }
      }
    })

  }

  return (
    <Wrapper>
      <Control>
        <Back to = '/'><FaArrowLeft />Back</Back>
        <Title>Bank Transfer</Title>
      </Control>
      <Subtitle>Request wallet credits from another user.</Subtitle>
      <Form method = 'POST' onSubmit = { onSubmit }>
        <TextField attrs = {{
          name: 'amount',
          placeholder: 'Amount',
          type: 'text'
        }} />
        <Submit type = 'submit'>Next</Submit>
      </Form>
    </Wrapper>
  )
}

export default Bank
