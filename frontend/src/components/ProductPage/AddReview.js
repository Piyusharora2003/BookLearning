import React, { useState } from 'react'
import style from "./AddRev.module.css"
import axios from 'axios';
import { useParams } from 'react-router';


function AddReview(props) {
  let params = useParams();
  const productId = params.id;
  const [Review,addReview] = useState("");
  const [rating,setrating] = useState(0);

  async function pushReview(){
      if(!localStorage.getItem("id")){
        alert("Login To Add Review");
      }
      else{
         await axios.post(`http://localhost:2000/api/v1/usercustom/${localStorage.getItem("id")}/Reviewitem/${productId}`,Review ==="" ? {"rating":rating} : {"description":Review,"rating":rating});
        window.location.reload();
      }
  }
  return (
      <div className={`form-floating ${style.box}`}>

          <textarea className={`form-control ${style.reviewBox}`} style={{"height":"6rem"}} value={Review} onChange={(e)=>{addReview(e.target.value)}} placeholder="We Value Your Review" id="floatingTextarea2"></textarea>
          <label htmlFor="floatingTextarea2">Add Your Review Here</label>
          <div className={style.btns}>
              <div className={style.stars}>
                <i className={`fa-solid fa-star  ${rating < 1 ? "" : style.active}  `} onClick={()=>rating === 1 ? setrating(0): setrating(1)} ></i>
                <i className={`fa-solid fa-star  ${rating < 2 ? "" : style.active}  `} onClick={()=>rating === 2 ? setrating(0): setrating(2)} ></i>
                <i className={`fa-solid fa-star  ${rating < 3 ? "" : style.active}  `} onClick={()=>rating === 3 ? setrating(0): setrating(3)} ></i>
                <i className={`fa-solid fa-star  ${rating < 4 ? "" : style.active}  `} onClick={()=>rating === 4 ? setrating(0): setrating(4)} ></i>
                <i className={`fa-solid fa-star  ${rating < 5 ? "" : style.active}  `} onClick={()=>rating === 5 ? setrating(0): setrating(5)} ></i>
              </div>
              <button className={style.submitbtn} disabled={Review === "" && rating === 0  ? 1:0} onClick={()=>pushReview()}>Submit</button>
          </div>
      </div>
  )
}

export default AddReview