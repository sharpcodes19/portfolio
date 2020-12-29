import React from 'react'
import ReactDOM from 'react-dom'
import { IconContext } from 'react-icons/lib'
import { BrowserRouter as Router } from 'react-router-dom'

import Netpay from './net-pay/NetPay'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <IconContext.Provider value = {{ className: 'icon' }}>
      <Router>
        <Netpay />
      </Router>
    </IconContext.Provider>
  </React.StrictMode>,
  document.getElementById ('root')
)