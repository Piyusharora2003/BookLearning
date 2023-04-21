import React from 'react';
import { Navigate } from 'react-router-dom';

<<<<<<< HEAD
 function LoginProtector({ isLogin, children , path }) {
  if (isLogin === true || localStorage.getItem("id")) {
    return children;
  }
  console.log(localStorage.getItem("id"));
  return <Navigate to="/login"  replace path={path}/>
=======
function LoginProtector({ isLogin, children , path }) {

  if (!isLogin ) {
    return <Navigate to="/login"  replace path={path}/>
  }
  return children
>>>>>>> 89f22d1283cfd8e983f92f3cb3b6e1543c71f61a
}
export default LoginProtector;