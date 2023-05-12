import React, { useState } from 'react'
import style from "./FrequentBuyTogether.module.css"
import FrequentBuyCard from './FrequentBuyCard';
import { data } from '../dummy/data';
import Cardsec2 from '../HomePage/Section2/Cardsec2';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FrequentBuyTogether({bookid,title}) {
    const responseFromMLServer = data.slice(0,10); //Currently Dummy Data
    const [invalidresponse,setvalid] = useState(true);

    const query = {
      query:title
    }

  async function getRecomendedBooks(){
    const res = await axios.post(
      "http://localhost:1000/recommend_books",  
      query,
      { withCredentials: true ,} 
      );
      console.log(res.data);
    // const res2 =  (await axios.get(`http://localhost:1000/fiction`, { withCredentials: true })).data;

      }
  getRecomendedBooks()
  return (
    <div className={style.main}>
        <div className={style.title}>
        You might be interested in
        </div>
        <div className={style.swipe}>
      {invalidresponse ? <>No recommendation for the product right now you may search for some popular products<Link to={'/'} className={style.linkto}>here</Link></>:
          
        responseFromMLServer.map((elem)=>{
          return <FrequentBuyCard key={elem._id} {...elem}/>
        })
             
    }
      </div>
    </div>
  )
}

export default FrequentBuyTogether