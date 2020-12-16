import React from 'react';

import SocialMedia from '../../social-media';
import Nav from '../../nav';
import TagLine from './tag-line';
import CV from './cv';
import Developer from './dev';

function Landing () {
  return (
    <section className = 's-landing'>
      <Nav />
      <TagLine />
      <CV />
      <SocialMedia />
      <Developer />
    </section>
  )
}

export default Landing
