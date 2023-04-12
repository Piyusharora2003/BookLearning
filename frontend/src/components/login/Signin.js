import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { useDispatch  } from 'react-redux';
import { addUser } from '../../redux/slices/userSlice';
import isEmail from 'validator/lib/isEmail';
import {  useNavigate } from 'react-router-dom';

function Signin({setpage,page}) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [credentials,setcredentials] = useState({
        email:"",
        password:""
    })

    function setchange(e){
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }
    function handleCatch(res){
        let message = "";
        switch (res.response.status) {
            case 401:
                message = "Wrong Details try again"
                console.log(message)
                break;
            default:
                message =  "some error in logging You in right now"
                console.log(message);
                break;
        }
        alert(message)
    }
    function LoginUserHandle(res){
        dispatch(addUser({
            token:res.data.token,
            name:res.data.user.name,
            email:res.data.user.email,
            mobileno:res.data.user.mobileno,
            role:res.data.user.role,
            itemsincart:res.data.user.itemsincart,
            id:res.data.user._id
        }));      
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("id",res.data.user._id)
        alert(`User ${res.data.user.name} logged in successfully`);
        navigate('/');
        // console.log(state);
        window.location.reload()
    }


    async function submit(){
        const config = { headers: { "Content-Type": "application/json" } ,                      withCredentials:true,
    };
        await axios.post("http://localhost:2000/api/v1/login",credentials,config)
                            .catch((res)=>handleCatch(res))
                            .then((res)=>LoginUserHandle(res))
    }


    //Form validator
    function checkSubmittedData(){          
        const {email , password} = credentials;
        if(isEmail(email) && password !==""){
            return true;
        } 
        return false;
    }
    

  return (
    
    <div className={`container  h70  m-auto p-4`} >
        <div className={`row  ${styles.wMax} `}>
            <div className={`col-lg-10 col-xl-7  p-4 mx-auto ${styles.box}`}> 
                <h3 className={`display-4 ${styles.title}`}>Book Shop</h3>
                <figcaption className="text-muted mb-4 mt-1 fw-bold ps-2">Login for a personalised experience </figcaption>
                <div className={styles.form}> 
                    <div className="form-group mb-3">
                        <input id="inputEmail" name='email' type="email" value={credentials.email} onChange={setchange} placeholder="Enter Your Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                    </div>
                    <div className="form-group mb-3">
                        <input id="inputPassword" type="password" name='password' value={credentials.password} onChange={setchange} placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                    </div>
                    <div className={styles.adjacent}>
                        <button onClick={submit} disabled={!checkSubmittedData()}  className="btn btn-primary btn-block text-uppercase mb-2 rounded shadow-sm">Sign in</button>
                        <div className={styles.signup}> New user <button className={styles.signupbtn} onClick={()=>setpage(!page)}>Sign Up</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin