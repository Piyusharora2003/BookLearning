import React from 'react'
import styles from "./Categories.module.css";
import { useNavigate } from 'react-router';

function CategoryCard(props) {
  const navigate = useNavigate();
  function navi(Categori){
    navigate(`/books/${Categori}`);
  }
  return (
   <div className={styles.item} onClick={(e)=>navi(props.category)}  >
    <img className={styles.img} src={props.categoryImage} alt=""/>
    <div className={`${styles.overlay} `}>
      <span className={`bg-warning text-dark rounded-pill p-2`}  >{props.category}</span>
      <div>
      </div>
    </div>
  </div>
  )
}

export default CategoryCard