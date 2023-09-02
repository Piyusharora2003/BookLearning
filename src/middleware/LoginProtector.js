import React from 'react';
import { Navigate } from 'react-router-dom';

 function LoginProtector({ isLogin, children , path }) {
  if (isLogin === true || localStorage.getItem("id")) {
    return children;
  }
  return <Navigate to="/login"  replace path={path}/>
}
export default LoginProtector;