import React from 'react';
import style1 from "./style1.module.css";
import { Link } from 'react-router-dom';
import img from "../assets/right.png"

function Section1() {
  return (
    <section className={style1.main}>
        <div className={style1.row}>
            <div className={style1.left}>
                <div className={style1.grptxt}>
                    <h3 className={style1.lefttitle}>upto 75% off</h3>
                    <p className={style1.leftsubtitle}>
                        Grasp Your Favourites Book Set at the lowest Price . New Arrival here lorem is a very new concept to me one must try lorem 
                    </p>
                </div>
                <Link to="/"  className={`${style1.shopbtn}`} >
                    Get Now
                </Link>
            </div>


            <div className={style1.right}>
                {/* image here */}
               <img src={img} alt="BookShelf" className={style1.img}/>
            </div>
        </div>
    </section>
  )
}

export default Section1