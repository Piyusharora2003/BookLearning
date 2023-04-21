import React,{ useEffect, useState ,createContext} from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route, Router } from "react-router-dom";
import { addUser } from './redux/slices/userSlice';
import axios from 'axios';

import './App.css';

import Home from './components/HomePage/Home';
import NoPage from './components/NoPage/NoPage';
import AddBook from './components/AddBook/AddBook';
import Cart from './components/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import LoginProtector from './middleware/LoginProtector';
import Login from './components/login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProductPage from './components/ProductPage/ProductPage';
import Loader from './components/Loader/Loader';
import CategoryPage from './components/CategoryPage/CategoryPage';

const UserContext = createContext();



function App() {
      const dispatch = useDispatch();
      const [isLogin,changeLoginStatus] = useState(false); 
      
      const [books,setbooks] = useState([]); // contains all book data from db
      useEffect(() => {
        async function getallBooks() {
            try {
              const response = await axios.get('http://localhost:2000/api/v1/getallbooks');
              setbooks(response.data.books)
            }
            catch(error){
              console.error(error);
            }
        }
      getallBooks();
      }, []);
      
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
                    let userdata = (await axios.get(`http://localhost:2000/api/v1/getuser/${id}`,config)).data.user;
                    if(userdata){
                      dispatch(addUser({
                            token:localStorage.token,
                            name:userdata.name,
                            email:userdata.email,
                            mobileno:userdata.mobileno,
                            role:userdata.role,
                            itemsincart:userdata.itemsincart,
                            id:userdata._id
                      }));
                      changeLoginStatus(true);
                    }
                    else{
                      localStorage.removeItem("token")
                      localStorage.removeItem("id");
                      changeLoginStatus(false);
                    }
                  }
                getuserdetail();
        }
      },[])
  

  return (
      <UserContext.Provider value={books}>
          <Routes>
              <Route path="/" exact element={<Home />}/>
              <Route path="/dashboard" exact element={
                    <LoginProtector isLogin={isLogin} >
                      <Dashboard  changeLoginStatus={changeLoginStatus} path="/dashboard" />
                    </LoginProtector>
                  }
                />
              <Route path="/addnew" exact element={
                    <LoginProtector isLogin={isLogin} path="/addnew">
                      <AddBook/>
                    </LoginProtector>
                  }
                />
              <Route path="/bookCollection/:id" exact  element={
                <ProductPage />
              } />
              <Route path="/books/:category" exact  element={
                <CategoryPage/>
              } />
              <Route path="/cart" exact element={<Cart isLogin={isLogin} />}/> 
              <Route path="/login" exact element={<Login />}/> 
              <Route path="*" element={<NoPage />} />
          </Routes>
      <br/>
      <br/>
      <br/>
          <ToastContainer />
      </UserContext.Provider>

  );
}

export default App;
export {UserContext};
