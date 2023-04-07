import * as React from 'react'
import cardstyle from "./cardstyle.module.css";
import { useDispatch } from 'react-redux';
import {addItem} from  '../../../redux/slices/cartSlice'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemToCart } from '../../../redux/slices/userSlice';


function Cardsec2(props) {
    const dispatch = useDispatch();
    const {author,title, description , price,image,_id} = props;
    let des = description
    des = des.slice(0,100);
    des+="...."
    function dispatchcall(){

        dispatch(addItemToCart({
            productId:_id,
            name:title,
            price:price,
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
    
return (
        <div className={`card ${cardstyle.body}`}>
          <img src={image} className={`card-img-top ${cardstyle.image}`} alt={title}/>
          <div className="card-body mt-1">
            <h5 className={`card-title ${cardstyle.title} `}>{title} :({author})</h5>
            <p className="card-text">{des}</p>
            <button  className={`btn btn-secondary ${cardstyle.btn}`} onClick={e=> {dispatchcall();}}>Add To cart for ${price}  &nbsp;
            <i className="fas fa-cart-shopping"></i>
            </button>
            </div>
        </div>
  )
}

export default Cardsec2;