import React from 'react'
import styled from '@emotion/styled'

import Image from '../../../assets/net-pay/brand.png'

const Wrapper = styled.div `
  max-width: 360px;
  margin: 0 auto;
`

const Img = styled.img `
  width: 100%;
  height: auto;
`

function Brand () {
  return (
    <Wrapper>
      <Img src = { Image } alt = 'brand' />
    </Wrapper>
  )
}

export default Brand
