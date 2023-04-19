import React ,{useRef} from 'react'
import CategoryCard from './CategoryCard'
import styles from "./Categories.module.css";
import { Swiper ,SwiperSlide } from 'swiper/react';    // for corosel
import 'swiper/css';
import 'swiper/css/scrollbar';


function Section3() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  let noperslide = (windowSize.current[0] < 1175)? 3 :4;    let arr = [1,2,3 ,4,5,6,7,8,9];
  return (
    <div className={styles.main}>
        <h2 className={styles.heading}>Choose By Categories</h2>
        <Swiper 
 spaceBetween={10} slidesPerView={noperslide}>
        {arr.map((elem)=>{
            // <SwiperSlide className={style2.centerbox} key={elem._id}> <Cardsec2 {...elem} key={elem._id}/></SwiperSlide>
            return <SwiperSlide key={elem}><CategoryCard category="Category" key={elem}/></SwiperSlide>
        })}
        </Swiper>
    </div>
  )
}

export default Section3