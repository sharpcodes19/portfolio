import React from 'react'
import { Fade } from 'react-awesome-reveal'

function CV () {
  return (
    <div className = 'cv-dl'>
      <Fade delay = { 1800 } cascade triggerOnce>
        <button type = 'button' className = 'btn'>Download CV</button>
        <p>
          <span>Link hosted by</span>
          <a href = 'https://firebase.google.com/' rel = 'noopener noreferrer' target = '_blank'>Google Firebase</a>
        </p>
      </Fade>
    </div>
  )
}

export default CV