import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowLeft, FaCloud, FaUser } from 'react-icons/fa'
// import { ImagePicker } from 'react-file-picker'

import Colors from '../../../Colors.json'
import Server from '../../Server.json'

const ColorScheme = Colors.netpay

const Wrapper = styled.div `
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1rem;
`

const Control = styled.div `
  padding: .5rem 0;
  display: flex;
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

const Section = styled.section `
  padding: 2rem;
  border: 1px solid ${ ColorScheme.dark };
  margin: 2rem 0;
  text-align: center;
  gap: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`

const NotificationSection = styled(Section) `

`

const AccountSection = styled(Section) `
`

const NameSection = styled(Section) `
`

const ImageSection = styled(Section) `
`

const Heading = styled.div `
`

const Title = styled.h3 `
  text-transform: uppercase;
  margin: 0 0 .5rem 0;
`

const WrapperTitle = styled(Title) `
  flex: 1;
  text-align: center;
  padding: 0 6rem 0 0;
  font-size: 2rem;
  color: ${ ColorScheme.dark };
`

const Subtitle = styled.p `
  font-size: .85rem;
`

const Card = styled.div `
  max-width: 45%;
`

const Update = styled.button `
  width: 100%;
  background: ${ ColorScheme.primary };
  padding: .7rem 0;
  color: ${ ColorScheme.light };
  display: flex;
  align-items: center;
  gap: .7rem;
  border: none;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: .85rem;
  font-family: Raleway, sans-serif;
  margin: 1rem 0 0 0;
  cursor: pointer;
`

function Profile () {

  const [authToken, setAuthToken] = useState ('')
  const [user, setUser] = useState ({})
  const history = useHistory ()

  useEffect(() => {
    const authToken = localStorage.getItem (Server.storage.authToken)
    if (!authToken) {
      return history.push ('/login')
    }

    axios.get (`${ Server.url }/a/${ authToken }`)
    .then ((result) => {
      if (!result.data.success) {
        return history.push ('/login')
      }
      localStorage.setItem (Server.storage.authToken, result.data.authToken)
      setUser (result.data.user)
      setAuthToken (result.data.authToken)
    }).catch ((ex) => {
      console.error (ex.message || ex)
      history.push ('/login')
    })
  }, [history, authToken])

  const handleUserInformation = () => {
    history.push ({
      pathname: `/profile/update-profile/${ user.id }`,
      state: { user, authToken }
    })
  }

  return (
    <Wrapper>
      <Control>
        <Back to = '/'><FaArrowLeft />Back</Back>
        <WrapperTitle>PROFILE</WrapperTitle>
      </Control>
      <NotificationSection>
        <Heading>
          <Title>Notification</Title>
          {
            !user.isVerified && <Subtitle>Please complete your profile and wait for CSR to verify your account.</Subtitle>
          }
        </Heading>
        
      </NotificationSection>
      <AccountSection>
        <Card>
          <Title>Account Code</Title>
          <Subtitle>{ user.code }</Subtitle>
        </Card>
        <Card>
          <Title>Mobile Number</Title>
          <Subtitle>{ user.mobileNumber }</Subtitle>
        </Card>
      </AccountSection>
      <NameSection>
        <Card>
          <Title>Name</Title>
          <Subtitle>{ `${ user.givenName } ${ user.middleName } ${ user.familyName }` }</Subtitle>
        </Card>
        <Card>
          <Title>Address</Title>
          <Subtitle>{ `${ user.addrHouseNo } ${ user.addrStreet } ${ user.addrCity } ${ user.addrProvince } ${ user.addrZipCode }` }</Subtitle>
        </Card>
        <Card>
          <Title>Bank Information</Title>
          <Subtitle>{ `${ user.bankName } ${ user.bankCity } ${ user.bankProvince } ${ user.bankCardHolder } ${ user.bankCardNumber }` }</Subtitle>
        </Card>
        <Update type = 'button' onClick = { handleUserInformation }><FaUser/>Update</Update>
      </NameSection>
      <ImageSection>
        <Card>
          <Title>Profile Picture</Title>
          <Subtitle>Take a selfie in a plain background and upload</Subtitle>
          {/* <ImagePicker 
            extensions = {[ 'jpg', 'jpeg', 'png']}
            onChange = { handleProfilePicture }
            onError = { () => { history.push ('/403') } }
          > */}
            <Update to = '/'><FaCloud />Upload</Update>
          {/* </ImagePicker> */}
        </Card>
        <Card>
          <Title>Valid ID</Title>
          <Subtitle>Scan or take a photo of any government issued ID. i.e: Passport, Drives License, SSS ID, National ID.</Subtitle>
          <Update to = '/'><FaCloud />Upload</Update>
        </Card>
      </ImageSection>
    </Wrapper>
  )
}

export default Profile
