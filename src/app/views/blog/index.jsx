import React from 'react';

import Nav from '../../components/blog/nav';
import LatestCard from '../../components/blog/latest';

function Blog () {
  return (
    <div className = 'v-blog'>
      <Nav />
      <LatestCard />

    </div>
  )
}

export default Blog;