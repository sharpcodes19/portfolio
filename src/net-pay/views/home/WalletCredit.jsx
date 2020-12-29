import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Total from './WalletCreditTotal'
import { useHistory } from 'react-router-dom'

import Server from '../../Server.json'

const Wrapper = styled.div `
  text-align: center;
  margin: 0 0 1rem 0;
` 

const TotalValue = styled.h1 `
  
`

const Text = styled.p `

`

function WalletCredit () {

  const history = useHistory ()
  const [total, setTotal] = useState ('₱ 0.00')

  useEffect (() => {
    Total.calculate (Server, history)
      .then ((value) => {
        if (!value) {
          value = 0
        }
        setTotal (new Intl.NumberFormat ('en-PH', {
          style: 'currency',
          currency: 'PHP'
        }).format (value))
      })
  }, [total, history])

  return (
    <Wrapper>
      <TotalValue>{ total }</TotalValue>
      <Text>Available Wallet Credits</Text>
    </Wrapper>
  )
}

export default WalletCredit
