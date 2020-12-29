import React from 'react'
import styled from '@emotion/styled'
import { Link, useHistory } from 'react-router-dom'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'

import Image from '../../../assets/net-pay/brand.png'
import Colors from '../../../Colors.json'
import Server from '../../Server.json'

const ColorScheme = Colors.netpay
const Wrapper = styled.nav `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

const Brand = styled(Link) `

`

const Img = styled.img `
  width: auto;
  max-height: 50px;
`

const List = styled.ul `
  display: flex;
  gap: 1.5rem;
  align-items: center;
`

const Item = styled.li `
  list-style: none;
  text-align: center;
`

const Anchor = styled(Link) `
  text-decoration: none;
`

const Button = styled.button `
  border: none;
  background: transparent;
  gap: .2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`

const Icon = styled.i `
  color: ${ ColorScheme.dark };
  font-size: 1.2rem;
`

const Text = styled.p `
  font-size: .75rem;
  font-weight: 700;
  font-family: Raleway, sans-serif;
  text-transform: uppercase;
  color: ${ ColorScheme.dark };
`

function Navigation () {
  const history = useHistory ()

  const onLogout = () => {
    localStorage.removeItem (Server.storage.authToken)
    history.push ('/login')
  }

  return (
    <Wrapper>
      <Brand to = '/'>
        <Img src = { Image } alt = 'brand' />
      </Brand>
      <List>
        <Item>
          <Anchor to = '/profile'>
            <Icon><FaUser /></Icon>
            <Text>Profile</Text>
          </Anchor>
        </Item>
        <Item>
          <Button type = 'button' onClick = { onLogout }>
            <Icon><FaSignOutAlt /></Icon>
            <Text>Logout</Text>
          </Button>
        </Item>
      </List>
    </Wrapper>
  )
}

export default Navigation
