import React from 'react'
import { useSelector } from 'react-redux';
import styles from "./styles.module.css";
import { Link} from "react-router-dom"

function Cart(props) {
    const items = useSelector((state)=>state.user.itemsincart);
    let itemList = [...items];
    let pricecart = 0 ;
    let quant =  0;
    itemList.forEach(element => {
      quant+=element.quantity;
      pricecart+=element.price *element.quantity;
    });

    return (
    <div>
      {  (props.isLogin === false)?

           <div class="alert alert-danger d-flex align-items-center" role="alert">
                <i class="fa-solid fa-triangle-exclamation p-1 pe-3"></i>
                You are not logged in right now Please Login/Signup First to Save Your Fav and place order
            </div>
            :
            <></>
      }
      <Link to="/" className={styles.prevbtn}><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>
        <table className={`table`}>
  <thead>
  <tr className="table-info">
      <th scope="col">Product_ID</th>
      <th scope="col">Name</th>
      <th scope="col">Price </th>
      <th scope="col">Quantity</th>
      <th scope="col">image</th>
    </tr>
  </thead>
  <tbody>
   {
    itemList.map((e)=>{
      return <tr key={e.productId}>
      <th scope="row">{e.productId}</th>
      <td>{e.name}</td>
      <td>{e.price}</td>
      <td>{e.quantity}</td>
      <td><img src={e.image} className={styles.img}/></td>
    </tr>
    })
}
<tr className="table-info">
      <th scope="row"></th>
      <td className={styles.total}>Total</td>
      <td>{pricecart}</td>
      <td>{quant}</td>
      <td></td>
</tr>
</tbody>
</table>

    </div>
  )
}

export default Cart