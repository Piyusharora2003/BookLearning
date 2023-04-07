import React from 'react'
import { useSelector } from 'react-redux';
import styles from "./styles.module.css";
import { Link} from "react-router-dom"

function Cart() {
    const items = useSelector((state)=>state);
    let pricecart = 0 ;
    let quant =  0;
    items.cart.forEach(element => {
      quant+=element.quantity;
      pricecart+=element.price *element.quantity;
    });

    return (
    <div>
      <Link to="/" className={styles.prevbtn}><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>
        <table className={`table`}>
  <thead>
  <tr className="table-info">
      <th scope="col">Product_ID</th>
      <th scope="col">Name</th>
      <th scope="col">Price </th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
   {
    items.cart.map((e)=>{
      return <tr key={e.id}>
      <th scope="row">{e.id}</th>
      <td>{e.name}</td>
      <td>{e.price}</td>
      <td>{e.quantity}</td>
    </tr>
    })
}
<tr className="table-info">
      <th scope="row"></th>
      <td className={styles.total}>Total</td>
      <td>{pricecart}</td>
      <td>{quant}</td>
</tr>
</tbody>
</table>

    </div>
  )
}

export default Cart