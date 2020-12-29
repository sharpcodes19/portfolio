import React from 'react'
import styled from '@emotion/styled'
import { FaMoneyBill, FaPiggyBank, FaQrcode, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Colors from '../../../Colors.json'

const ColorScheme = Colors.netpay

const Wrapper = styled.div `
  padding: 1rem;
`

const List = styled.ul `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: .5rem;
`

const Item = styled.li `
  list-style: none;
  border: 1px solid lightGray;
`

const Anchor = styled(Link) `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: 100px;
  color: ${ ColorScheme.primary };
`

const Text = styled.p `
  font-weight: 700;
  text-transform: uppercase;
  font-size: .8rem;
  font-family: Raleway, sans-serif;
`

const Icon = styled.i `
  font-size: 1.7rem;
`

function Transcations() {

  const Transcations = [
    { icon: FaMoneyBill, text: 'Add Credits', to: '/transcation/credit' },
    { icon: FaUsers, text: 'P2P Request', to: '/transcation/p2p' },
    { icon: FaQrcode, text: 'Pay QR', to: '/transcation/qr' },
    { icon: FaPiggyBank, text: 'Bank Transfer', to: '/transcation/bank' }
  ]

  return (
    <Wrapper>
      <List>
        {
          Transcations.map ((tr, i) => {
            return <Item key = { i }>
              <Anchor to = { tr.to }>
                <Icon>{ tr.icon && <tr.icon /> }</Icon>
                <Text>{ tr.text }</Text>
              </Anchor>
            </Item>
          })
        }
      </List>
    </Wrapper>
  )
}

export default Transcations
