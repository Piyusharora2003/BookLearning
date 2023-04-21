import React, { useState } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';

function Login() {
    const [loginpage,setpage] = useState(true);  // false means to signup
  return (
        <div className={`container-fluid`}>
            <div className={`row no-gutter`}>
                <div className={`col-md-6 bg-light`}>
                    <Link to="/" className={styles.prevbtn}><i className="fa-sharp fa-solid fa-arrow-left"></i></Link>
                    <div className={` ${styles.login} d-flex align-items-center py-5`}>
                        {
                        (loginpage === true) ?  
                            <Signin setpage={setpage} page = {loginpage}/>
                            : 
                            <Signup setpage={setpage} page={loginpage}/>
                        }
                    </div>
                </div>
        <div className={`col-md-6 d-none d-md-flex ${styles.bgImage}`}></div>
    </div>
</div>

  )
}

export default Login;