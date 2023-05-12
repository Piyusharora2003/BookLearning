import React,{useRef ,useContext , useEffect, useState} from 'react';
import styles from "./Section2.module.css";
import Cardsec2 from './Cardsec2';
import { UserContext } from '../../../App';

import { Swiper ,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';

function allequal(a,b){
  if(a === b){
    return true;
  }
  return false;
}

function urlEncode(str) {
  return str.replace(/\s/g, '%20');
}


function Section2() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    let noperslide = (windowSize.current[0] < 1175)? 3 :4;
    if(windowSize.current[0] < 900){
        noperslide = 2
    }

    if(windowSize.current[0] < 610){
      noperslide = 1
    }
    const [books,setbooks] = useState([]);
    useEffect(()=>{
    async function getFamousBooks(){
      const bookdata = await axios.get('http://localhost:2000/api/v1/getfamousbooks');
      const onebookdata = await axios.get('http://localhost:1000/popular')
      const titleexampleone = "Harry Potter and the Goblet of Fire (Book 4)";
      const encodedTitle = urlEncode(titleexampleone);
      const res = await axios.post(`http://localhost:2000/api/v1/getbookbytitle`,{title:titleexampleone});
      // console.log(res.data.book);
      // console.log(onebookdata.data.title);
      // console.log(bookdata.data.items);
      setbooks(onebookdata.data.title)
      // console.log(books);
    }
    getFamousBooks();
},[])

    return (
      <div className={styles.main}>
          <h1 className={styles.heading}>
          <span>
              famous books
          </span>
          </h1>

      <div className={` ${styles.btnParent}`}>
      <Swiper id="trendingSwiper" 
      slidesPerView={noperslide} className={styles.swiper}
      >
        {books.map((elem,index)=>{
      
        return <SwiperSlide key={index}><Cardsec2 title={elem}/></SwiperSlide>
      })}
      </Swiper>
      <button className={styles.btnPrev} onClick={()=>{
        document.getElementById("trendingSwiper").scrollBy(-300,0);
      }}><i className="fa-solid fa-arrow-left"></i></button>
      
      <button className={styles.btnNext} onClick={()=>{
        document.getElementById("trendingSwiper").scrollBy(300,0);
      }}><i className="fa-solid fa-arrow-right"></i></button>
      </div>
  </div>
  )
}

export default Section2;