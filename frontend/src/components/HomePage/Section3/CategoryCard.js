import React from 'react'
import styles from "./Categories.module.css";

function CategoryCard(props) {
    
  return (
   <div className={styles.item}>
    <img className={styles.img} src="https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
    <div className={styles.overlay}>
      <span>Great Britain</span>
      <div>
        <h2>{props.category}</h2>
        <p>12 Popular places</p>
      </div>
    </div>
  </div>
  )
}

export default CategoryCard