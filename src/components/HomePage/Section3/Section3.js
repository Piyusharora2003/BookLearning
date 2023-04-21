import React ,{useRef} from 'react'
import CategoryCard from './CategoryCard'
import styles from "./Categories.module.css";
import { Swiper ,SwiperSlide } from 'swiper/react';    // for corosel
import 'swiper/css';
import 'swiper/css/scrollbar';

import arr from "./CategoryData.js"

function Section3() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  let noperslide = (windowSize.current[0] < 1175)? 3 :4;
  if(windowSize.current[0] < 900){
      noperslide = 2
  }

  if(windowSize.current[0] < 610){
    noperslide = 1
  }
  return (
    <div className={styles.main}>
          <h1 className={styles.heading}>
          <span>
              Find By Categories
          </span>
          </h1>
        <div className={` ${styles.btnParent}`}>
      <Swiper id="CategoriesSwiper" 
      slidesPerView={noperslide} className={styles.swiper}
      >      {arr.map((elem)=>{
        return <SwiperSlide key={elem.category}><CategoryCard {...elem} key={elem}/></SwiperSlide>
      })}
      </Swiper>
      <button className={styles.btnPrev} onClick={()=>{
        document.getElementById("CategoriesSwiper").scrollBy(-310,0);
      }}><i className="fa-solid fa-arrow-left"></i></button>
      
      <button className={styles.btnNext} onClick={()=>{
        document.getElementById("CategoriesSwiper").scrollBy(333,0);
      }}><i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  )
}

export default Section3