import React from 'react'
import style from "./offer.module.css"

function Offers() {
  return (
    <ul className={style.list}>
        <li className='' ><span className={style.offerHead} > Special Price : </span>Get extra 17% off (price inclusive of cashback/coupon) <span className='fw-bold text-primary'>T&C</span></li>
        <li className='' ><span className={style.offerHead} > Bank Offer :    </span>10% off on Axis Bank Credit Card and EMI Transactions, up to ₹1500, on orders of ₹5,000 and above <span className='fw-bold text-primary'>T&C</span></li>
        <li className='' ><span className={style.offerHead} > Bank Offer :    </span>10% off on Paaji Bank Credit Card and EMI Transactions, up to ₹2500, on orders of ₹7,000 and above <span className='fw-bold text-primary'>T&C</span></li>
        <li className='' ><span className={style.offerHead} > Taging Offer :    </span> Upload Your Book and get 2 books free <span className='fw-bold text-primary'>T&C</span></li>

    </ul>
    
  )
}

export default Offers