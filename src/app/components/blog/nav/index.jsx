import React from 'react';
import { Link as Anchor } from 'react-router-dom';

import config from '../../../../config.json';

function Nav () {
  return (
    <nav className = 'b-nav'>
      
      <div className = 'top'>
        <h1 className = 'title'>{ config.dev.name.brand }</h1>
        <span className = 'mini-title'>Personal blog</span>
      </div>

      <div className = 'mid'>
        <ul>
          <li>
            <Anchor to = { config.routes.home }>Portfolio</Anchor>
          </li>
        </ul>
      </div>

    </nav>
  )
}

export default Nav;
