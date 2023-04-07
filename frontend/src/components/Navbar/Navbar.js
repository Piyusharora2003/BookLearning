import React from 'react';
import {Outlet , Link} from "react-router-dom"
import style from "./Navbarcss.module.css";


function Navbar() {
  return (
    <div>
        <nav className={`navbar navbar-expand-lg  ${style.navbag}`}>
            <div className="container-fluid">
                  <Link to="/" className={`navbar-brand ${style.logo}`}><i className="fas fa-book"></i> Book Store</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link to="/"  className={`nav-link active ${style.navitems}`} aria-current="page" >Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/addnew"  className={`nav-link active ${style.navitems}`} aria-current="page" >Add New Book</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/"  className={`nav-link active ${style.navitems}`} aria-current="page" >DeepStash</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/"  className={`nav-link active ${style.navitems}`} aria-current="page" >Trending</Link>
                      </li>
                    </ul>
                  <div className={style.iconsgrp}>
                    <Link to="#search" className={style.icons} > <i className="fas fa-search "></i> </Link>
                    <Link to="/cart" className={style.icons} > <i className="fas fa-shopping-cart "></i> </Link>
                    <Link to="/dashboard" className={style.icons} > <i className="fas fa-user "></i> </Link>
                  </div>
                  </div>
            </div>
        </nav>
        <Outlet />
    </div>
  )
}

export default Navbar