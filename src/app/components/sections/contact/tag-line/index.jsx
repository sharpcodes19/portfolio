import React from 'react';
import { Slide } from 'react-awesome-reveal';

const TagLine = () => {
  return (
    <div className = 'tag-line'>
      <span className = 'mini-title'>You can contact me here</span>
      <Slide duration = { 700 } delay = { 300 } direction = 'left' triggerOnce = { true }>
        <div className = 'slide'>
          <h1 className = 'title'>Got a project?</h1>
          <p className = 'sub-title'>Drop me a message.</p>
        </div>
      </Slide>
    </div>
  )
}

export default TagLine;