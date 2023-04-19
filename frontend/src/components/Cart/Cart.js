import React from 'react'
import { useSelector } from 'react-redux';
import styles from "./styles.module.css";
import { Link, useNavigate} from "react-router-dom"
import axios from 'axios';

function Cart(props) {
  const navigate = useNavigate();
    const items = useSelector((state)=>state.user.itemsincart);
    let itemList = [...items];
    let pricecart = 0 ;
    let quant =  0;
    let orignalpricecart = 0;
    itemList.forEach(element => {
      console.log(element);
      quant+=element.quantity;
      pricecart+=element.price *element.quantity;
      orignalpricecart+=element.mrp *element.quantity;
    });
    let tax = 0.18*pricecart.toPrecision(2);

    function orderHandle(){
        navigate('/dashboard')
    }
    async function removeFromCart(e){
        const userId =  localStorage.getItem("id");
        const productId = e;
        const res = await axios.delete(`http://localhost:2000/api/v1/usercustom/${userId}/items/${productId}`)
        window.location.reload()
    }
    return (
    <div>
      <button className={styles.orderNowbtn} onClick={orderHandle}>Order Now</button>
      {  (props.isLogin === false)?

           <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="fa-solid fa-triangle-exclamation p-1 pe-3"></i>
                You are not logged in right now Please Login/Signup First to Save Your Fav and place order
            </div>
            :
            <></>
      }
      <Link to="/" className={styles.prevbtn}><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>
        <table className={`table`}>
  <thead>
  <tr className="table-info">
      <th scope="col" className={styles.productId}>Product_ID</th>
      <th scope="col">Name</th>
      <th scope="col">Price </th>
      <th scope="col"> MRP </th>
      <th scope="col">Quantity</th>
      <th scope="col">Discard</th>
      <th scope="col">image</th>
    </tr>
  </thead>
  <tbody>
   {
    itemList.map((e)=>{
      return <tr key={e.productId}>
      <th scope="row" className={styles.productId}>{e.productId}</th>
      <td>{e.name}</td>
      <td>{e.price}</td>
      <td>{e.mrp}</td>
      <td>{e.quantity}</td>
      <td><button  className={`bg-none`} onClick={()=>removeFromCart(e.productId)}><i className="fa-solid fa-trash"></i></button></td>
      <td><img src={e.image} alt={e.name} className={styles.img}/></td>
    </tr>
    })
}
<tr className="table border border-none ">
      <th className={styles.productId}></th>
      <td className={styles.total}>Net Sum</td>
      <td className='fw-bold'>{pricecart}</td>
      <td>{orignalpricecart}</td>
      <td className='fw-bold'>{quant}</td>
      <td></td>
</tr>
<tr className="table border border-none">
      <th scope="row" className={styles.productId}></th>
      <td className={styles.total}>Discount </td>
      <td className='fw-bold'>{(pricecart && orignalpricecart)?(100-(pricecart/orignalpricecart)*100).toPrecision(2) : 0}%</td>
      <td></td>
      <td></td>
</tr>
<tr className="table border border-none">
      <th scope="row" className={styles.productId}></th>
      <td className={styles.total}>Tax @18%</td>
      <td className='fw-bold'>{tax}</td>
      <td></td>
      <td></td>
</tr>
<tr className="table-danger">
      <th scope="row" className={styles.productId}></th>
      <td className={styles.total}>Total Chargeable Amount (in Rs.)</td>
      <td className='fw-bold'>{pricecart+tax}</td>
      <td></td>
      <td></td>
      <td></td>
</tr>
</tbody>
</table>

    </div>
  )
}

export default Cart;