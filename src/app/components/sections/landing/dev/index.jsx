import React from 'react'
import { Zoom } from 'react-awesome-reveal'

import config from '../../../../../config.json'
import Me from '../../../../assets/dev.jpg'

const Developer = () => {
  return (
    <div className = 'dev'>
      <Zoom delay = { 2300 } duration = { 400 } triggerOnce>
        <div className = 'wave'>
          <img src = { config.dev.photoUrl || Me } alt = 'me' />
        </div>
        <div className = 'name'>
          <span className = 'given'>Jae</span>
          <span className = 'family'>Jarabe</span>
        </div>
      </Zoom>
    </div>
  )
}

export default Developer
