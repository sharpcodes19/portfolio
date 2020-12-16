import React from 'react'

import TextField from '../field'

function TextArea (props) {
  return (
    <TextField render = {
      <textarea { ...props } ></textarea>
    } />
  )
}

export default TextArea
