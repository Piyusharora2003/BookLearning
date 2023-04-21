import React from 'react'
import style from "./FrequentBuyTogether.module.css"
import { useNavigate } from 'react-router-dom'

//         "_id": "64275ca9533cafd8f9468587",
// "title": "The Courage To Be ",
// "author": "ICHIRO KISHIMI",
// "description": "The book emphasizes the importance of taking responsibility for one's own life and choices, rather than blaming past experiences or external factors.",
// "price": 410,
// "image": "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51y34ZoVTTL._SX324_BO1,204,203,200_.jpg",
// "__v": 0


function FrequentBuyCard(props) {
    const navigate = useNavigate();
    function navigateCall(){
        navigate(`/bookCollection/${props._id}`);
        window.location.reload()
    }
  return (
       <div className={`card ${style.card}`}>
            <img src={props.image} className={`card-img-top ${style.image}`} alt="..."/>
            <div className={`card-body ${style.spacebtw}`}>
                <h5 className="card-title">{props.title}</h5>
                <button  className={`btn btn-primary ${style.btn}`} onClick={e=>{navigateCall()}}>Add To cart for ${props.price}  &nbsp;</button>
            </div>

        </div>
  )
}

export default FrequentBuyCard;