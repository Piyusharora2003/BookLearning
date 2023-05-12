import React,{useEffect,useState} from 'react'
import style from "./FrequentBuyTogether.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom'


function FrequentBuyCard({title}) {

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
const [dataaquired,setdataaq] = useState(true)


  useEffect(()=>{
    async function getdetails(){
        const res = await axios.post(`http://localhost:2000/api/v1/getbookbytitle`,{title:title});
        console.log(title);
        if(res.status !== 200){
          setdataaq(false)
        }
        // console.log(res.data.book.image);
        adddetail(res.data.book)
    }
    getdetails()
},[])

  return (
    <>

      
      <div className={`card ${style.card}`}>
     { dataaquired ? 
              <Link className={style.todefault} to={`/bookCollection/${bookdetail._id}`} onClick={()=>{window.location.reload()}}>
            <img src={bookdetail.image} className={`card-img-top ${style.image}`} alt="..."/>
            <div className={`card-body ${style.spacebtw}`}>
                <h5 className="card-title">{bookdetail.title}</h5>
                <h6 className='text-secondary'>{bookdetail.author}</h6>
            </div>
            </Link>
        :
        
            <h1 className={style.nodetailcard}>{title}</h1>
        
  }
        </div>
    </>
  )
}

export default FrequentBuyCard;