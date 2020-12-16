import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import config from '../../../config.json';
import ForbiddenImage from '../../assets/undraw_warning_cyit.svg'

function Forbidden (props) {
  const history = useHistory ();

  useEffect (() => {
    document.title = `${ config.dev.name.brand } | Forbidden`;
    if (!props.verified) {
      return history.push (config.routes.home);
    }
  }, [history, props.verified])

  return (
    <div className = 'v-forbidden'>
      <div className = 'message'>
        <h1 className = 'title'>Forbidden</h1>
        <p>{ props.message || 'HTTP Codes 403.' }</p>
      </div>
      
      <img src = { ForbiddenImage } alt = 'forbidden' />
    </div>
  )
}

export default Forbidden;