import React, { useState } from 'react';
import styles from './AddBook.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const [newbook,adddetail] = useState({
        "title":"",
        "author":"",
        "Summary":"",
        "price":0,
        "mrp":0,
        "image":"",
        "bookpdf":""
    });

    function updateDetails(e){
        const name = e.target.name;
        const value = e.target.value;
        adddetail(values => ({...values, [name]: value}))
    }
    
    async function submit(){
        const bookname = newbook.title;
        await axios.post("http://localhost:2000/api/v1/addnewbook",newbook).then((res)=>{console.log(res)});
        adddetail({  "title":"",  "author":"",  "Summary":"","metatags":"",  "price":0,"mrp":0,  "image":"",  "bookpdf":"" });
        alert(`Book ${bookname} added Successfully`);
    }
    
    const disabled = ()=>{
        const {title,author,Summary,image,bookpdf} = newbook
        if(title ==="" || author === "" || Summary.length < 120 || image === 0 || bookpdf === "" ){
            return 1;
        }
        return 0;
    }

  return (
<div className={`container-fluid ${styles.bdy}`}>
    <div className={`row no-gutter`}>
        <div className={`col-md-5 bg-light ${styles.left}`}>
            <Link to="/" className={styles.prevbtn}><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>
            <div className={` ${styles.login} d-flex  py-5 pe-3`}>
                    <div className={styles.title}>
                            Add New Book
                    </div>
                    <div className={styles.form} >
                        <div className="form-group">
                              <label className={styles.label} htmlFor="title">title</label>
                              <input className={`form-control`} id="title" type="text" name="title" onChange={(e)=>updateDetails(e)} value={newbook.title}/>
                          </div>
                          <div className="form-group">
                              <label className={styles.label} htmlFor="author">author</label>
                              <input className={`form-control`} id="author" type="text" name="author" onChange={(e)=>updateDetails(e)} value={newbook.author} />
                          </div>
                          <div>&lt;---Categories List to be Inserted Here---&gt;</div>
                          <div className="form-group">
                              <label className={styles.label} htmlFor="Summary">Summary</label>
                              <input className={`form-control`} id="Summary" type="text" name="Summary"  onChange={(e)=>updateDetails(e)} value={newbook.Summary}/>
                          </div>
                          <div className="form-group">
                              <label className={styles.label} htmlFor="metatags">Meta-Tags</label>
                              <input className={`form-control`} id="metatags" type="text" name="metatags"  onChange={(e)=>updateDetails(e)} value={newbook.metatags}/>
                          </div>
                          <div className="form-group">
                              <label className={styles.label} htmlFor="price">price (in Rs)</label>
                              <input className={`form-control`} id="price" type="Number" name="price" onChange={(e)=>updateDetails(e)} value={newbook.price}/>
                          </div>
                          <div className="form-group">
                              <label className={styles.label} htmlFor="mrp">Max Selling Price (in Rs)</label>
                              <input className={`form-control`} id="mrp" type="Number" name="mrp" onChange={(e)=>updateDetails(e)} value={newbook.mrp}/>
                          </div>
                          <div className="form-group">
                              <label className={styles.label} htmlFor="image">image link</label>
                              <input className={`form-control`} id="image" type="text" name="image" onChange={(e)=>updateDetails(e)} value={newbook.image}/>
                          </div>
                          <div className="form-group">
                              <label className={styles.label} htmlFor="bookpdf">bookpdf link</label>
                              <input className={`form-control`} id="bookpdf" type="text" name="bookpdf" onChange={(e)=>updateDetails(e)} value={newbook.bookpdf}/>
                          </div>
                          <input className={`btn btn-primary ${styles.btn}`}  disabled ={disabled()}  onClick={submit} value="Publish" />
                    </div>
                    <div className={styles.note}> * Book title Should be unique and the Summary of the book should atleast be of 120 letters </div>
            </div>
        </div>
        <div className={`col-md-7 d-none d-md-flex ${styles.bgImage}`}></div>
    </div>
</div>

  )
}

export default Login