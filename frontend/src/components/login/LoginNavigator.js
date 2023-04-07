import React from 'react'
import Login from './Login';
import Dashboard from '../Dashboard/Dashboard';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux'

// if login return to dashboard else move to login page
function LoginNavigator() {
      const [logged,checklogged] = useState(false);  // true means to dashboard
      const user = useSelector((state)=>state.user);
      useEffect(()=>{
          if(user.token || localStorage.token){
              checklogged(true);
          }
      },[]);

    return (
    <div>
      {
        (logged)?
            <Dashboard/>
          :
             <Login/>
      } 
    </div>
  )
}

export default LoginNavigator;