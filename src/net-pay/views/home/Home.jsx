import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import Navigation from './Navigation'
import Transcations from './Transcations'
import Server from '../../Server.json'
import WalletCredit from './WalletCredit'
import History from './History'
import Pagination from './Pagination'

const Wrapper = styled.div `
  max-width: 700px;
  margin: 0 auto;
`

function Home () {

  const [authToken, setAuthToken] = useState ('')
  const [pageNumber, setPageNumber] = useState ('')
  const history = useHistory ()

  const handlePageChange = (value) => {
    setPageNumber (value)
  }

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
    }).catch ((ex) => {
      console.error (ex.message || ex)
      history.push ('/login')
    })
  }, [history, authToken])

  return (
    <Wrapper>
      <Navigation />
      <WalletCredit />
      <Transcations />
      <Pagination handlePage = { handlePageChange } />
      <History authToken = { authToken } pageNumber = { pageNumber } />
    </Wrapper>
  )
}

export default Home
