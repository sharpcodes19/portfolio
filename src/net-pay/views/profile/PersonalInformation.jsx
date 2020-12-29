import React, { createRef, useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import styled from '@emotion/styled'
import axios from 'axios'
import { FaArrowLeft } from 'react-icons/fa'

import TextField from '../../components/TextField'
import Colors from '../../../Colors.json'
import Server from '../../Server.json'

const ColorScheme = Colors.netpay

const Wrapper = styled.form `
  max-width: 550px;
  min-height: 100vh;
  padding: 2rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 3rem;
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

const Section = styled.section `
  gap: 2rem;
`

const Subtitle = styled.p `
  font-size: .85rem;
  width: 100%;
`

const Title = styled.h2 `
  text-transform: uppercase;
  margin: 0 0 .5rem 0;
`

const UserSection = styled(Section) `
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
`

const UserField = styled(TextField) `
  max-width: 350px;
`

const Save = styled.button `
  margin: 1rem 0 0 0;
  width: 100%;
  height: 40px;
  background: ${ ColorScheme.primary };
  border: none;
  color: ${ ColorScheme.light };
  font-weight: 700;
  text-transform: uppercase;
  font-family: Raleway, sans-serif;
  cursor: pointer;
`

const UserFieldAttrs = [
  {
    name: 'givenName',
    type: 'text',
    placeholder: 'First Name'
  },
  {
    name: 'middleName',
    type: 'text',
    placeholder: 'Middle Name'
  },
  {
    name: 'familyName',
    type: 'text',
    placeholder: 'Last Name'
  },
]

const AddressAttrs = [
  {
    name: 'houseNo',
    type: 'text',
    placeholder: 'Bldg No. / House No.'
  },
  {
    name: 'street',
    type: 'text',
    placeholder: 'Street'
  },
  {
    name: 'province',
    type: 'text',
    placeholder: 'Province'
  },
  {
    name: 'city',
    type: 'text',
    placeholder: 'City'
  },
  {
    name: 'zipCode',
    type: 'text',
    placeholder: 'Zip / Postal Code'
  },
]

const BankAttrs = [
  {
    name: 'bankName',
    type: 'text',
    placeholder: 'Bank Name'
  },
  {
    name: 'bankProvince',
    type: 'text',
    placeholder: 'Bank Province'
  },
  {
    name: 'bankCity',
    type: 'text',
    placeholder: 'Bank City'
  },
  {
    name: 'cardHolder',
    type: 'text',
    placeholder: 'Card Holder'
  },
  {
    name: 'cardNumber',
    type: 'text',
    placeholder: 'Card Number'
  },
]

function PersonalInformation () {

  const location = useLocation ()
  const formRef = createRef ()
  const history = useHistory ()

  useEffect (() => {
    if (location.state && location.state.user) {
      const user = location.state.user
      formRef.current.givenName.value = user.givenName
      formRef.current.middleName.value = user.middleName
      formRef.current.familyName.value = user.familyName
      formRef.current.houseNo.value = user.addrHouseNo
      formRef.current.street.value = user.addrStreet
      formRef.current.province.value = user.addrProvince
      formRef.current.city.value = user.addrCity
      formRef.current.zipCode.value = user.addrZipCode

      formRef.current.bankName.value = user.bankName
      formRef.current.bankProvince.value = user.bankProvince
      formRef.current.bankCity.value = user.bankCity
      formRef.current.cardHolder.value = user.bankCardHolder
      formRef.current.cardNumber.value = user.bankCardNumber
    }
  }, [ location.state, formRef ])

  const onSave = async (e) => {
    e.preventDefault ();
    
    const data = {
      name: {
        given: formRef.current.givenName.value,
        middle: formRef.current.middleName.value,
        family: formRef.current.familyName.value
      },
      address: {
        houseNo: formRef.current.houseNo.value,
        street: formRef.current.street.value,
        province: formRef.current.province.value,
        city: formRef.current.city.value,
        zipCode: formRef.current.zipCode.value
      },
      bank: {
        name: formRef.current.bankName.value,
        province: formRef.current.bankProvince.value,
        city: formRef.current.bankCity.value,
        cardHolder: formRef.current.cardHolder.value,
        cardNumber: formRef.current.cardNumber.value
      }
    }

    if (location.state && location.state.authToken) {
      const authToken = location.state.authToken
      try {
        const result = await axios.post (`${ Server.url }/a/basic-info`, { authToken, data })
        if (!result.data.success) {
          return history.push ('/403')
        }
        history.push ('/profile')
      } catch (ex) {
        console.error (ex.message || ex)
        history.push ('/403')
      }
    }
  }

  return (
    <Wrapper method = 'POST' ref = { formRef } onSubmit = { onSave }>
      <Control>
        <Back to = '/profile'><FaArrowLeft />Back</Back>
        <Title>Update profile</Title>
      </Control>
      <Section>
        <Title>Personal Information</Title>
        <Subtitle>Enter your personal information.</Subtitle>
      </Section>
      <UserSection>
        {
          UserFieldAttrs.map ((attr, i) => {
            return <UserField key = { i } 
              attrs = { attr }
            />
          })
        }
      </UserSection>
      <UserSection>
        {
          AddressAttrs.map ((attr, i) => {
            return <UserField key = { i } 
              attrs = { attr }
            />
          })
        }
      </UserSection>
      
      <Section>
        <Title>Bank Information</Title>
        <Subtitle>For withdrawal requests.</Subtitle>
      </Section>
      <UserSection>
        {
          BankAttrs.map ((attr, i) => {
            return <UserField key = { i } 
              attrs = { attr }
            />
          })
        }
      </UserSection>
      <Save type = 'submit'>Save</Save>
    </Wrapper>
  )
}

export default PersonalInformation
