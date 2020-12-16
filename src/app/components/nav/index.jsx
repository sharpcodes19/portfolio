import React from 'react';
import { Link } from 'react-scroll';
import { Link as Anchor } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

import config from '../../../config.json';

function Navigation () {

  return (
    <nav className = 'c-nav'>
      <Fade direction = 'down' cascade duration = { 700 } triggerOnce>
        <ul>
          <li>
            <Link 
              to = 'contactMe' 
              spy = { true } 
              smooth = { true } 
              activeClass = 'active'>Contact</Link>
          </li>
          <li>
            <Link 
              to = 'myWorks' 
              spy = { true } 
              smooth = { true } 
              activeClass = 'active'>Works</Link>
          </li>
          <li>
            <Anchor to = { config.routes.blog }>Blog</Anchor>
          </li>
        </ul>
      </Fade>
    </nav>
  )
}

export default Navigation
