import React from 'react'
import ReactTooltip from 'react-tooltip'
import { Fade } from 'react-awesome-reveal'

import MongoDb from '../../../../assets/mern/mongodb-icon.svg'
import ExpressJS from '../../../../assets/mern/expressjs-icon.svg'
import ReactJS from '../../../../assets/mern/reactjs-icon.svg'
import NodeJS from '../../../../assets/mern/nodejs-icon.svg'

function TagLine () {
  return (
    <div className = 'tag-line'>
      <Fade direction = 'right' delay = { 600 } duration = { 1000 } triggerOnce>
        <span className = 'mini-title'>Introduction</span>
        <h1 className = 'title'>Full-stacked Website Developer, based in Rizal</h1>
        <Fade delay = { 1500 } triggerOnce>
          <p className = 'sub-title'>
              <a 
                href = 'https://www.mongodb.com/mern-stack' 
                rel = 'noreferrer noopener' 
                target = '_blank'
                data-tip
                data-for = 'tooltipMERNStack'
              >MERN Stack</a>
              <span>based website.</span>
          </p>
        </Fade>

        <ReactTooltip 
          id = 'tooltipMERNStack' 
          className = 'tooltip' 
          place = 'bottom'
          type = 'light'
          effect = 'solid'
          delayShow = { 100 }
          delayHide = { 300 }
          aria-haspopup = 'true'
        >
          <div className = 'mern'>
            <img src = { MongoDb } alt = 'mongo-db' />
            <img src = { ExpressJS } alt = 'express-js' />
            <img src = { ReactJS } alt = 'react-js' />
            <img src = { NodeJS } alt = 'node-js' />
          </div>
        </ReactTooltip>
      </Fade>
    </div>
  )
}

export default TagLine
