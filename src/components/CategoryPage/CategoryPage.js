import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import style from "./style.module.css";

function allequal(a,b,c){
  if(a === b && a === c){
    return true;
  }
  return false;
}

function Card(props){
  const {title,author,image} = props;
    return(
      <div className={style.cardmain}>
        <div className={style.image}><img src={image} alt={title} /></div>
        <div className={style.title}>{title.slice(0,60)}</div>
        <div className={style.author}>{author}</div>
        <div className={style.btn}><button>Add to cart</button></div>
      </div>
    )
}

function CategoryPage() {
    let params = useParams();
    const [books,setbooks] = useState([]);
    useEffect(()=>{
          async function getbookbycategory(category){
            try {
              const res =  (await axios.get(`http://localhost:1000/${category}`, { withCredentials: true })).data;
          
            const resdata = []
            const datalength = res.book.length;
            if(!allequal(datalength,res.author.length,res.image.length)){
              alert("error in retriving data")
              console.log(res.author.length + " "+ res.image.length + " "+ datalength );
              throw new Error("DataSet found corrupted !! Working on it");
              // a function that logs the issue
            }
            for(let i = 0 ; i < datalength ; i++){
              let obj = {"title":res.book[i] , "author":res.author[i] , "image":res.image[i],"id":i,};
              resdata.push(obj);
            }
            setbooks(resdata);
          } catch (error) {
            console.log("failed in getting data");
          }
        }
        getbookbycategory(params.category.toLowerCase())
    },[])
  return (

    // <div className=''>
    //   <div className={style.body}>
    //     {books.map((elem)=>{
    //       return <Card key={elem.id} {...elem}/>
    //     })
    //   }
    //   </div>
    // </div>
    <div className={`p-4`}>
      <div className={`fs-1 text-decoration-underline fw-bold ${style.head} `}>{params.category} books</div>
      <div className={style.body}>
        {   books.map((elem)=>{
                return <Card key={elem.id} {...elem}/>
          })
      }
      </div>
    </div>
  )
}

export default CategoryPage