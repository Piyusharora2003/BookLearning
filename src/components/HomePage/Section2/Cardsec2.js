import {  toast } from 'react-toastify';
import { addItemToCart } from '../../../redux/slices/userSlice';
import * as React from 'react';
import styles from "./Section2.module.css"
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


function Cardsec2({title}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [bookdetail,adddetail] = useState({
        "_id": "",
        "title": "",
        "author": "",
        "Summary": "",
        "price": 0,
        "mrp": 0,
        "image": "",
        "rating": 0,
        "reviews": [],
    })
    
    useEffect(()=>{
        async function getdetails(){
            const res = await axios.post(`http://localhost:2000/api/v1/getbookbytitle`,{title:title});
            if(res.status !== 200){
                return undefined;
            }
            // console.log(res.data.book);
            adddetail(res.data.book)
        }
        getdetails()
    },[])

    async function dispatchcall(){
        const newbook = {
            "title":bookdetail.title,
            "author":bookdetail.author,
            "price":bookdetail.price,
            "image":bookdetail.image,
            "bookpdf":"",
            "Summary":bookdetail.Summary,
            "price":bookdetail.price,
            mrp:bookdetail.mrp
        }

        await axios.post("http://localhost:2000/api/v1/addnewbook",newbook).then((res)=>{console.log(res);})
        dispatch(addItemToCart({
            productId:bookdetail._id,
            name:bookdetail.title,
            price:bookdetail.price,
            mrp:bookdetail.mrp,
            quantity:1,
            image:bookdetail.image
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
        navigate(`/bookCollection/${bookdetail._id}`);
    }

  return (
    <div className={styles.item} >
    <img className={styles.img}  src={bookdetail.image} alt=""/>
    <div className={styles.overlay}>
        <div onClick={navigateCall} className={styles.s50} >
            <div className={`text-center fw-bolder fs-5 ${styles.titlelimit}`}>{title}</div>
            <div className={`text-center fw-bold text-secondary fs-6`}>{bookdetail.author}</div>
        </div>
        <div className="d-flex flex-column w-88 ms-auto me-auto">
        <button className={`btn btn-danger mb-2`}> ₹{bookdetail.price}   <i className="fa-solid fa-tag"></i></button>
        <button className={`btn btn-primary mb-2`} onClick={e=> {dispatchcall();} }>Add To cart <i className="fa-sharp fa-solid fa-cart-plus"></i></button>
        <button className={`btn btn-warning`} onClick={navigateCall}>Read More  <i className="fa-solid fa-eye fa-xs"></i></button>
        </div>
    </div>
  </div>
  )
}

export default Cardsec2;