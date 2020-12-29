import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import Colors from '../../../Colors.json'

const ColorScheme = Colors.netpay
const Wrapper = styled.div `
  border: 1px solid ${ ColorScheme.dark };
`
const Control = styled.div `
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  gap: 1rem;
`

const Back = styled.button `
  cursor: pointer;
  color: ${ ColorScheme.danger };
  font-weight: 600;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  background: transparent;
  border: none;
  text-transform: uppercase;
`

const Content = styled.div `
  padding: 1rem;
  font-size: .9rem;
`

const Title = styled.h3 `
  text-transform: uppercase;
  margin: 0 0 1.5rem 0;
`

const Statement = styled.div `
  overflow-y: auto;
  max-height: 250px;
`

const Subtitle = styled.p `
  margin: 1rem 0;
  font-weight: 600;
`

const Proceed = styled(Back) `
  color: ${ ColorScheme.light };
  background: ${ ColorScheme.dark };
  padding: .5rem 2rem;
  font-size: .9rem;
`

const Disagree = styled(Link) `
  font-size: .85rem;
  text-decoration: none;
  font-weight: 500;
  color: ${ ColorScheme.danger };
  margin: auto 1rem auto 0;
`

function TermsAndConditions (props) {
  return (
    <Wrapper>
      <Control>
        <Back onClick = { props.onBack }>Cancel</Back>
      </Control>
      <Content>
        <Title>Terms and Conditions</Title>
        <Statement>
          <Subtitle>
            You must agree with our tems and condition to proceed
          </Subtitle>
          Please read these Terms of Use (“Terms”, “Terms of Use”) carefully before using the NetPay App (the “Service”) operated by NetPay (“us”, “we”, or “our”).
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
          <Subtitle>
            Intellectual Property
          </Subtitle>
          The Service and its original content, features and functionality are and will remain the exclusive property of NetPay and its licensors.
          <Subtitle>
            Links To Other Web Sites
          </Subtitle>
          Our Service may contain links to third-party web sites or services that are not owned or controlled by NetPay.
          NetPay has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that NetPay shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
          We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
          <Subtitle>
            Disclaimer
          </Subtitle>
          Your use of the Service is at your sole risk. The Service is provided on an “AS IS” and “AS AVAILABLE” basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
          <Subtitle>
            Governing Law
          </Subtitle>
          These Terms shall be governed and construed in accordance with the laws of Republic of the Philippines without regard to its conflict of law provisions.
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
          <Subtitle>
            Changes
          </Subtitle>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
        </Statement>
      </Content>
      <Control>
        <Proceed type = 'submit' onClick = { props.onSubmit }>Agree</Proceed>
        <Disagree to = '/login'>Disagree</Disagree>
      </Control>
    </Wrapper>
  )
}

export default TermsAndConditions
