import React,{useRef ,useContext} from 'react';
import { Swiper ,SwiperSlide } from 'swiper/react';    // for corosel
import 'swiper/css';
import style2 from "./style2.module.css";
import Cardsec2 from './Cardsec2';
import { UserContext } from '../../../App';

function Section2() {
  // Sets No of elements in the slider according to screen size
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    let noperslide = (windowSize.current[0] < 1175)? 3 :4;
    if(windowSize.current[0] < 900){
        noperslide = 2
    }

    if(windowSize.current[0] < 610){
      noperslide = 1
    }
  // ends here , get the famous items list in form of array
    const books = useContext(UserContext);
    let arr =[...books].slice(0,8)    // currently taking the first eight products only
    return (
      <section className={style2.main}>
          <h1 className={style2.heading}>
          <span>
              famous books
          </span>
          </h1>
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
  )
}

export default Section2;