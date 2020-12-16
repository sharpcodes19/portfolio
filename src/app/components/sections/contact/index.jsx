import React from 'react';

import TagLine from './tag-line';
import Form from './form';
import Specification from './specifications';

function Contact () {

  return (
    <div className = 's-contact' name = 'contactMe'>
      <div className = 'wrapper'>
        <TagLine />
        <Form />
        <Specification />
      </div>
    </div>
  )
}

export default Contact;
