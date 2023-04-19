import React from 'react'
import style from "./FrequentBuyTogether.module.css"
import FrequentBuyCard from './FrequentBuyCard';
import { data } from '../dummy/data';
import Cardsec2 from '../HomePage/Section2/Cardsec2';

function FrequentBuyTogether({id}) {
    const responseFromMLServer = data.slice(0,10); //Currently Dummy Data

  return (
    <div className={style.main}>
        <div className={style.title}>
        You might be interested in
        </div>
        <div className={style.swipe}>
          
        {responseFromMLServer.map((elem)=>{
          return <FrequentBuyCard key={elem._id} {...elem}/>
        })
      }        
      </div>
    </div>
  )
}

export default FrequentBuyTogether