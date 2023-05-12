import React, { useState } from 'react'
import style from "./FrequentBuyTogether.module.css"
import FrequentBuyCard from './FrequentBuyCard';
import { data } from '../dummy/data';
import Cardsec2 from '../HomePage/Section2/Cardsec2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function FrequentBuyTogether({bookid,title}) {
    // const responseFromMLServer = data.slice(0,10); //Currently Dummy Data
    const [invalidresponse,setvalid] = useState(true);
    const [recommend,setrecommend] = useState([])
    const query = {
      query:title
    }
    useEffect(()=>{
      async function getRecomendedBooks(){
        const res = await axios.post(
          "http://localhost:1000/recommend_books",  
          query,
          { withCredentials: true } 
          );
          if(res.data){
            // console.log(res.data.data);
            setrecommend(res.data.data);
            setvalid(false);
            
          }
        }
        getRecomendedBooks()
      },[])
  return (
    <div className={style.main}>
        <div className={style.title}>
        You might be interested in
        </div>
        <div className={style.swipe}>
      {invalidresponse ? 
          <>
          No recommendation for the product right now you may search for some popular products<Link to={'/'} className={style.linkto}>here</Link>
          </>:
          <>
          {
            recommend.map((elem,index)=>{
              // console.log(elem);
              return <FrequentBuyCard key={index} title ={elem.title}/>
            })
          }
        </>
             
    }
      </div>
    </div>
  )
}

export default FrequentBuyTogether;