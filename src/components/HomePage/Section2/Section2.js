import React,{useRef ,useContext} from 'react';
import styles from "./Section2.module.css";
import Cardsec2 from './Cardsec2';
import { UserContext } from '../../../App';

import { Swiper ,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Section2() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    let noperslide = (windowSize.current[0] < 1175)? 3 :4;
    if(windowSize.current[0] < 900){
        noperslide = 2
    }

    if(windowSize.current[0] < 610){
      noperslide = 1
    }
    const books = useContext(UserContext);
    let arr =[...books].slice(0,8)    // currently taking the first eight products only
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
      >      {arr.map((elem)=>{
        return <SwiperSlide key={elem._id}><Cardsec2 {...elem}  key={elem}/></SwiperSlide>
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