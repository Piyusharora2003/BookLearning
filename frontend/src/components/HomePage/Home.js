import React from 'react';

import Section1 from './Section1/Section1.js';
import Section2 from './Section2/Section2.js';
import Navbar from '../Navbar/Navbar.js';

function Home() {

  return (
    <div>
          <Navbar/>
          <Section1/>
          <Section2/>
    </div>
  )
}

export default Home;
