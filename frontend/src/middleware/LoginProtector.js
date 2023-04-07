import React from 'react';
import { Navigate } from 'react-router-dom';

function LoginProtector({ isLogin, children , path }) {

  if (!isLogin ) {
    return <Navigate to="/login"  replace path={path}/>
  }
  return children
}
export default LoginProtector;