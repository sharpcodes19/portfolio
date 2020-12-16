import React, { useState } from 'react';

function TextField (props) {

  const [focused, setFocused] = useState (false);

  const handleFocus = () => {
    setFocused (true);
  }
  const handleBlur = (e) => {
    setFocused (e.target.value.length);
  }
  const handleChange = (e) => {
    if (props.onChange) {
      props.onChange (e.target.value);
    }
  }

  return (
    <div className = { `c-text ${ focused ? 'focused' : '' }` }>
      {
        props.render || <input
          name = { props.name }
          placeholder = { props.placeholder }
          type = { props.type }
          onBlur = { handleBlur }
          onFocus = { handleFocus }
          onChange = { handleChange }
          value = { props.value || '' }
          required = { props.required || false }
        />
      }
    </div>
  )
}

export default TextField
