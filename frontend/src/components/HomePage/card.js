import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

export default function BookCard({title,author,description,price,image}) {

    const dispatch = useDispatch();

    function addtocart(){
      dispatch(addItem({name:title,price:price}));
      // a post request uploading the data to backend fro the user 
    }

  return (
<>
   title: {title}<br/>author: {author}<br/>description: {description}<br/>
        <button onClick={e=>addtocart() }>Rs. {price}</button>
</>
  );
}