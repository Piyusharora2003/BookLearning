import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route } from "react-router-dom";
import { addUser } from './redux/slices/userSlice';
import axios from 'axios';

import './App.css';

import Home from './components/HomePage/Home';
import NoPage from './components/NoPage/NoPage';
import AddBook from './components/AddBook/AddBook';
import Cart from './components/Cart/Cart';
import LoginNavigator from './components/login/LoginNavigator';
import { ToastContainer } from 'react-toastify';
function App() {
      const dispatch = useDispatch();

      // check from storage if the token is present or not if yes transfer all token data to redux-store

      useEffect(()=>{
          if( localStorage.token){       
            const token  = localStorage.getItem("token");   
                async function getuserdetail(){
                    const id  = localStorage.getItem("id");
                    const config = {
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                      },
                      withCredentials:true,
                      Authorization: `Bearer ${token}` //Add this line
                    };
                    const userdata = (await axios.post(`getuserdata`,id={id},config)).data.user;
                    console.log(userdata);
                    if(userdata){
                      dispatch(addUser({
                            token:localStorage.token,
                            name:userdata.name,
                            email:userdata.email,
                            mobileno:userdata.mobileno,
                            role:userdata.role,
                            itemsincart:userdata.itemsincart,
                            id:userdata._id
                      }))
                    }
                    else{
                      localStorage.removeItem("token")
                      localStorage.removeItem("id")
                    }
                  }
                getuserdetail();
        }
      },[])
  

  return (
    <div>
      
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/cart" exact element={<Cart />}/> 
        <Route path="/dashboard" exact element={<LoginNavigator />}/> 
        <Route path="/addnew" exact element={<AddBook/>}/> 
        <Route path="*" element={<NoPage />} />
      </Routes>
      <br/>
      <br/>
      <br/>
      <ToastContainer />

    </div>
  );
}

export default App;
