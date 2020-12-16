import React from 'react';
import { Link } from 'react-scroll';
import { Fade } from 'react-awesome-reveal';

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
              to = 'mySkills' 
              spy = { true } 
              smooth = { true } 
              activeClass = 'active'>Skills</Link>
          </li>
          <li>
            <Link 
              to = 'myWorks' 
              spy = { true } 
              smooth = { true } 
              activeClass = 'active'>Works</Link>
          </li>
        </ul>
      </Fade>
    </nav>
  )
}

export default Navigation
