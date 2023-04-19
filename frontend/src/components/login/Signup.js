import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { useDispatch  } from 'react-redux';
import { addUser } from '../../redux/slices/userSlice';
import isEmail from 'validator/lib/isEmail';

function Signup({setpage,page}) {

    const dispatch = useDispatch();
    const [cf,setcf] = useState("")
    const [credentials,setcredentials] = useState({
        name:"",
        mobileno:"",
        email:"",
        password:""
    })

    function setchange(e){
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }
    function handleCatch(res){
        let message = "";
        switch (res.response.status) {
            case 11000:
                message = "Email already exist";
                console.log(message);
                break;
            case 401:
                message = "Wrong Details try again"
                console.log(message)
                break;
            default:
                message =  res.error || res.message
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
        window.location.reload()
    }


    async function Upload(){
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.post("http://localhost:2000/api/v1/newuser",credentials,config)
                            .catch((res)=>handleCatch(res))
                            .then((res)=>LoginUserHandle(res))
    }


    //Form validator
    function checkSubmittedData(){          
        const {email , password , mobileno , name} = credentials;
        if(isEmail(email) && password !=="" && name !== "" && mobileno.length === 10 && password === cf  ){
            return true;
        } 
        return false;
    }
    
  return (
    <div className={`container  h70  m-auto p-4`} >
        <div className={`row  ${styles.wMax} `}>
            <div className={`col-lg-10 col-xl-7  p-4 mx-auto ${styles.box}`}> 
                <h3 className={`display-4 ${styles.title}`}>Book Shop</h3>
                <figcaption className="text-muted mb-4 mt-1 fw-bold ps-2">Join Us Today & Be a part of Us</figcaption>
                <div className={styles.form}> 
                    <div className="form-group mb-3">
                        <input id="inputName" name='name' type="text" value={credentials.name} onChange={setchange} placeholder="Enter Your Name" required="true" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                    </div>
                    <div className="form-group mb-3">
                        <input id="inputMobileNo" name='mobileno' type="Number" value={credentials.mobileno} onChange={setchange} placeholder="Enter Your Mobile Number" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                    </div>
                    <div className="form-group mb-3">
                        <input id="inputEmail" name='email' type="email" value={credentials.email} onChange={setchange} placeholder="Enter Your Email address" required="" autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                    </div>
                    <div className="form-group mb-3">
                        <input id="inputPassword" type="password" name='password' value={credentials.password} onChange={setchange} placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                    </div>
                    <div className="form-group mb-3">
                        <input id="ConfirmPassword" type="password" value={cf} name='ConfirmPassword' placeholder="Confirm Password" onChange={(e)=>setcf(e.target.value)} required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                    </div> 
                    <div className={styles.adjacent}>
                        <button onClick={Upload} disabled={!checkSubmittedData()}  className="btn btn-primary btn-block text-uppercase mb-2 rounded shadow-sm">Create An Account</button>
                        <div className={styles.signup}> Already a User <button className={styles.signupbtn} onClick={()=>setpage(!page)}>Sign In</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup;