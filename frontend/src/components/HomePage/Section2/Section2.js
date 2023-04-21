import React,{useRef ,useContext} from 'react';
<<<<<<< HEAD
import styles from "./Section2.module.css";
import Cardsec2 from './Cardsec2';
import { UserContext } from '../../../App';

import { Swiper ,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Section2() {
=======
import { Swiper ,SwiperSlide } from 'swiper/react';    // for corosel
import 'swiper/css';
import style2 from "./style2.module.css";
import Cardsec2 from './Cardsec2';
import { UserContext } from '../../../App';

function Section2() {
  // Sets No of elements in the slider according to screen size
>>>>>>> 89f22d1283cfd8e983f92f3cb3b6e1543c71f61a
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    let noperslide = (windowSize.current[0] < 1175)? 3 :4;
    if(windowSize.current[0] < 900){
        noperslide = 2
    }

    if(windowSize.current[0] < 610){
      noperslide = 1
    }
<<<<<<< HEAD
    const books = useContext(UserContext);
    let arr =[...books].slice(0,8)    // currently taking the first eight products only
    return (
      <div className={styles.main}>
          <h1 className={styles.heading}>
=======
  // ends here , get the famous items list in form of array
    const books = useContext(UserContext);
    let arr =[...books].slice(0,8)    // currently taking the first eight products only
    return (
      <section className={style2.main}>
          <h1 className={style2.heading}>
>>>>>>> 89f22d1283cfd8e983f92f3cb3b6e1543c71f61a
          <span>
              famous books
          </span>
          </h1>
<<<<<<< HEAD

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
=======
          <div className={style2.slider}>
              <Swiper spaceBetween={10} slidesPerView={noperslide}>
              {
                  arr.map((elem)=>{
                      return <SwiperSlide className={style2.centerbox} key={elem._id}> <Cardsec2 {...elem} key={elem._id}/></SwiperSlide>
                  })
              }
              </Swiper>
          </div>
      </section>
>>>>>>> 89f22d1283cfd8e983f92f3cb3b6e1543c71f61a
  )
}

export default Section2;