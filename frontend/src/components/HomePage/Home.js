import React, { useState  , useEffect, createContext} from 'react';
import axios from "axios"

import Section1 from './Section1/Section1.js';
import Section2 from './Section2/Section2.js';
import Navbar from '../Navbar/Navbar.js';

const UserContext = createContext();

function Home() {
    const [books,setbooks] = useState([]); // contains all book data from db
    useEffect(() => {
        async function getallBooks() {
            try {
                const response = await axios.get('http://localhost:2000/api/v1/getallbooks');
                setbooks(response.data.books)
            }
            catch(error){
                console.error(error);
            }
        }
      getallBooks();
  }, []);

  return (
    <div>
        <UserContext.Provider value={books}>
          <Navbar/>
          <Section1/>
          <Section2/>
        </UserContext.Provider>
    </div>
  )
}

export default Home;
export {UserContext};