// import * as React from 'react'
// import cardstyle from "./cardstyle.module.css";
// import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { addItemToCart } from '../../../redux/slices/userSlice';
// import {  useNavigate } from 'react-router-dom';


// function Cardsec2(props) {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();



//     const {author,title, description , price,mrp,image,_id} = props;
//     let des = description
//     des = des;
//     des+="...."

//     function dispatchcall(){

//         dispatch(addItemToCart({
//             productId:_id,
//             name:title,
//             price:price,
//             mrp:mrp,
//             quantity:1,
//             image:image
//         }))

//         // toast(,{className:`{cardstyle.toast}`});
//         toast.success(`Book : ${title} is added to cart`, {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             });
//         // add it to users db 
        
//     }

//     function navigateCall(){
//         console.log("is called");
//         navigate(`/bookCollection/${_id}`);
//     }
    
// return (
//         <div className={`card ${cardstyle.body}`}>
//           <img src={image} className={`card-img-top ${cardstyle.image}`} alt={title}  onClick={e=>{navigateCall()}} />
//           <div className="card-body mt-1">
//             <h5 className={`card-title ${cardstyle.title} `}  onClick={e=>{navigateCall()}} >{title} :({author})</h5>
//             <p className={`card-text ${cardstyle.description} `}  onClick={e=>{navigateCall()}} >{des}</p>
//             <button  className={`btn btn-secondary ${cardstyle.btn}`} onClick={e=> {dispatchcall();}}>Add To cart for ${price}  &nbsp;
//             <i className="fas fa-cart-shopping"></i>

import * as React from 'react';
import styles from "./Section2.module.css"
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


function Cardsec2(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {author , title , price , image , _id} = props;
    function dispatchcall(){
        dispatch(addItemToCart({
            productId:_id,
            name:title,
            price:price,
            mrp:props.mrp,
            quantity:1,
            image:image
        }))

        // toast(,{className:`{cardstyle.toast}`});
        toast.success(`Book : ${title} is added to cart`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        // add it to users db 
        
    }

    function navigateCall(){
        navigate(`/bookCollection/${props._id}`);
    }

  return (
    <div className={styles.item} >
    <img className={styles.img}  src={image} alt=""/>
    <div className={styles.overlay}>
        <div onClick={navigateCall} >
            <div className={`text-center fw-bolder fs-5`}>{title}</div>
            <div className={`text-center fw-bold text-secondary fs-6`}>{author}</div>
        </div>
        <div className="d-flex flex-column w-88 ms-auto me-auto">
        <button className={`btn btn-danger mb-2`}> ₹{price}   <i className="fa-solid fa-tag"></i></button>
        <button className={`btn btn-primary mb-2`} onClick={e=> {dispatchcall();} }>Add To cart <i className="fa-sharp fa-solid fa-cart-plus"></i></button>
        <button className={`btn btn-warning`} onClick={navigateCall}>Read More  <i className="fa-solid fa-eye fa-xs"></i></button>
        </div>
    </div>
  </div>  )
}

export default Cardsec2