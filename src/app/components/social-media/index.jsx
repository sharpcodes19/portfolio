import React from 'react';
import { isMobile } from 'react-device-detect';
import { FaFacebookF, FaTwitter, FaUser } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

import config from '../../../config.json';

const toIcon = (name) => {
  if (name === 'fb')        return <FaFacebookF />
  else if (name === 'tw')   return <FaTwitter />
  else                      return <FaUser />
}

function SocialMedia () {

  return (
    <div className = 'social-media'>
      <Fade direction = 'up' duration = { 300 } delay = { 2000 } triggerOnce>
        <ul>
          {
            config.components.socialMedia.map ((item, i) => {
              return <li key = { i }>
                <a 
                  href = { isMobile ? item.links.mobile : item.links.desktop } 
                  className = { item.name }
                  rel = 'noopener noreferrer'
                  target = '_blank'
                >{
                  toIcon (item.name)
                }</a>
              </li>
            })
          }
        </ul>
      </Fade>

    </div>
  )
}

export default SocialMedia
