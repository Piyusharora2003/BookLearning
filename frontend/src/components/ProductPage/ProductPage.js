import React,{ useEffect , useState} from 'react'
import { useParams } from 'react-router';
import style from "./ProductPagedesign.module.css"
import axios from 'axios';
import {  toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import ChatBox from './ChatBox';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/userSlice';
import AddReview from './AddReview';
import Loader from '../Loader/Loader';
import Offers from './Offers';
import FrequentBuyTogether from '../FrequentBuyTogether/FrequentBuyTogether';

// Gives Star To each review Box
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
  const params = useParams();
  const product_id = params.id
  const [prod , putProduct] = useState(null);
  const [ratin,setrating] = useState(0);
  const dispatch = useDispatch();
      
      // const books = useContext(UserContext);
      useEffect(()=>{
      async function getProductDetail(id){
         let res = (await axios.get(`http://localhost:2000/api/v1/getbook/${id}`)).data.book;
         putProduct(res);
         let count = 0;
         const reviewLength = res.reviews.length;
         res.reviews.forEach(element => {
              count+=element.rating/reviewLength;
        });
        setrating(count);
        }
        getProductDetail(product_id);
    },[]);

    if(!prod){
      return <Loader />
    }

    let reviews =prod.reviews.slice(0,6);

    function addToCart(){

      dispatch(addItemToCart({
        productId:prod._id,
        name:prod.title,
        mrp:prod.mrp,
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

  return (
    <div>
        <Navbar />

      <section className={style.productInfo}>
          <div className={style.stack}>
            <img src={prod.image} className={style.productImage}/>
            <div className={style.push}>
            <button type="button" className={`btn btn-warning ${style.btns}`} onClick={addToCart}>Add To Cart</button>
            <button type="button" className={`btn btn-danger  ${style.btns}`}>Buy Now</button>
            </div>
          </div>
          <div className={style.rightstack}>
            <div className={style.title}>{prod.title} </div>
            <div className={style.figcap}>
              <button type="button" className={`btn btn-success ${style.ratingCALC}`}>{ratin.toPrecision(2)}<i className={`fa-solid fa-star ${style.ratingstar}`}></i></button>
              <a className={style.reviewsCount} href='#reviews'>{prod.reviews.length}Reviews</a>
            </div>
            <div className='mt-2'>
                <span className={style.priceTag}> ₹ {prod.price} </span>
                {
                  prod.mrp !== 0 ?
                  <>
                  <span className={`fw-lighter text-decoration-line-through ${style.maximumTag}`}>₹{prod.mrp}</span>
                  <span className={` ${style.discountTag}`}>{100-((prod.price/prod.mrp).toPrecision(2)*100)}%</span>
                  </>
                  :
                  <></>
                }
            </div>
            <div className={style.author}>
              Author :<span className='text-dark'> {prod.author} </span>
            </div>
            <div className={`fw-bold pt-1 fs-5`}>Available Offers </div>
            <Offers/>
            <div className="accordion w-70" id="accordionExample">
              <div className="accordion-item w-0"></div>
                <div className="accordion-item border">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Description
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                          {prod.description}
                      </div>
                  </div>
                </div>
              </div>
            </div>
      </section>



    {/* Related Books */}
  <FrequentBuyTogether key={params.id}/>
      {/* Review Section */}
        {/* <ReviewSection prod={prod}/> */}
        <div className={style.body}>
        <h2 className={style.heading} id='reviews'>Reviews</h2>
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
                                        elem.userid === localStorage.getItem("id") ?
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
    </div>
  )
}

export default ProductPage;