import React from 'react';

import Section1 from './Section1/Section1.js';
import Section2 from './Section2/Section2.js';
import Navbar from '../Navbar/Navbar.js';
import Section3 from './Section3/Section3.js';

function Home() {

  return (
    <div>
          <Navbar/>
          <Section1/>
          <Section2/>
          <Section3/>
    </div>
  )
}

export default Home;
