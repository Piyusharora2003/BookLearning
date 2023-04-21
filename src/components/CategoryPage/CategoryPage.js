import React from 'react'
import { useParams } from 'react-router';

function CategoryPage() {
    let params = useParams();

  return (
    <div className='p-3 m-3 text-uppercase'>HERE we will be CALLing AN API WITH PARAMERTER PASSED : <span className='fw-bold fs-6 text-danger text-uppercase '>{params.category}</span>.<br/> From the backend python server</div>
  )
}

export default CategoryPage