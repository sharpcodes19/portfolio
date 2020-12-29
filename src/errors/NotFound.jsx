import React from 'react'
import styled from '@emotion/styled'

import Image from '../assets/undraw_page_not_found_su7k.svg'

function NotFound (props) {

  const Wrapper = styled.div `
    width: 100%;
    padding: 2rem;
    max-width: 500px;
    min-height: 100vh;
    text-align: center;
    margin: 0 auto;
  `

  const Heading = styled.div `
  `
  const Title = styled.h1 `
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 3rem;
    color: ${ props.color.dark };
  `
  const Subtitle = styled.p `
    margin: .5rem 0 0 0;
  `
  const Img = styled.img `
    max-width: 360px;
    width: 100%;
    height: auto;
    margin: 7rem 0;
  `

  const Credit = styled.p `
    font-size: .7rem;
    margin: .5rem 0 0 0;
  `

  const ExternalLink = styled.a `
    margin: 0 0 0 .2rem;
    text-decoration: none;
    color: ${ props.color.warning };
    font-weight: 700;
  `

  return (
    <Wrapper>
      <Heading>
        <Title>Page Not Found</Title>
        <Subtitle>The page you are looking for is not existing.</Subtitle>
      </Heading>
      <Img src = { Image } alt = 'not-found' />
      <Subtitle>HTTP Code 404 — Not Found</Subtitle>
      <Credit>This image was downloaded on 
        <ExternalLink href = 'https://undraw.co' rel = 'noopener noreferrer' target = '_blank'>Undraw.co</ExternalLink>
      </Credit>
    </Wrapper>
  )
}

export default NotFound
