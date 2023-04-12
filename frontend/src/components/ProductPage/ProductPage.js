import React,{ useEffect, useState} from 'react'
import { useParams } from 'react-router';
import style from "./ProductPagedesign.module.css"
import axios from 'axios';
import {  toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import ChatBox from './ChatBox';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/userSlice';
import ReviewSection from './ReviewSection';
import AddReview from './AddReview';
import Loader from '../Loader/Loader';

function Rating({count}){
    let arr = [];
    for (let index = 0; index < count; index++) {
      arr.push(index);      
    }

    return(
      <>
      {
        arr.map((e)=>{
         return <i key={e} className="fas fa-star"></i>
        })
      }
      </>
    )
}

function ProductPage() {
  let params = useParams();
  let product_id = params.id
  const [prod , putProduct] = useState(null);
      const dispatch = useDispatch();
      
      // const books = useContext(UserContext);
      useEffect(()=>{
      async function getProductDetail(id){
         putProduct((await axios.get(`http://localhost:2000/api/v1/getbook/${id}`)).data.book)
      }
      
      getProductDetail(params.id);
    },[])

    if(!prod){
      return <Loader/>
    }
    let reviews =prod.reviews.slice(0,6);
    // console.log(reviews);
    function addToCart(){
      dispatch(addItemToCart({
        productId:prod._id,
        name:prod.title,
        price:prod.price,
        quantity:1,
        image:prod.image
    }))
    toast.success(`Book : ${prod.title} is added to cart`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    
    // let product = (books.find(e=>e._id === productId));   
    // let {author,description,image,price,title ,_id} = product   // _id === product id
  return (
    <div>
        <Navbar />
        <section className={style.main}>
            <div className={style.row}>
                <div className={style.left}>
                    <img src={prod.image} alt={prod.title} className={style.img}/>
                </div>
                <div className={style.right}>
                    <div className={style.title}>
                        {prod.title}
                    </div>
                    <div className={style.author}>
                        -{prod.author}
                    </div>
                    <div className={style.description}>
                      {prod.description}
                    </div>
                    <div className={style.price}>
                     Price : ₹{prod.price}
                    </div>
                    <div className={style.addToCart} onClick={addToCart}>
                        Add To Cart <i className="fa-solid fa-cart-plus"></i>
                    </div>
                </div>
        </div>
        </section>

      {/* Review Section */}
        {/* <ReviewSection prod={prod}/> */}
        <div className={style.body}>
        <h2 className={style.heading}>Reviews</h2>
        <AddReview productId = {product_id}/>
        <div className={`${style.main}`}>
{/* Review Card */}
{
    reviews.map((elem)=>{
      async function removeReview(){
          if(elem.userid === localStorage.getItem("id")){
            await axios.delete(`http://localhost:2000/api/v1/deletereview/${prod._id}/${elem._id}/${localStorage.getItem("id")}`);          }
          window.location.reload();
      }
        return  <section key={elem._id} className={style.testimonials}>
                    <div className={style.testimonialBoxContainer}>
                        <div className={style.testimonialBox}>
                            <div className={style.boxTop}>
                                <div className={style.profile}>
                                    <div className={style.profileImg}>
                                        <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                                    </div>
                                    <div className={style.nameUser}>
                                        <strong>{elem.name}</strong>
                                      {
                                        elem.userid == localStorage.getItem("id") ?
                                            <i className={`fa-solid fa-trash ${style.editReview}`} onClick={()=>removeReview()}></i>
                                                :
                                            <></>
                                      }
                                    </div>
                                </div>
                                <div className={style.reviews}>
                                  <Rating count = {elem.rating}/>
                                </div>
                            </div>
                            <div className={style.clientComment}>
                                <p>{elem.description}</p>
                            </div>
                        </div>
                    </div>
                </section>
    })
}    

    </div>
    </div>
        {/* QNA SECTION */}
          <h1 className={style.h1}>QNA</h1>
        <div className={`accordion ${style.qnasection}`} id="accordionPanelsStayOpenExample">
          <div className={style.leftqna}>
            <div className="accordion-item">
              <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Accordion Item #1
                </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div>
            <div className="accordion-item">
            <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            Accordion Item #2
            </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
              </div>
              </div>
              <div className="accordion-item">
              <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
              Accordion Item #3
              </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
              <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
          </div>
          <div className={style.rightqna}>
            <ChatBox prod = {prod}/>
          </div>

        </div>
    </div>
  )
}

export default ProductPage