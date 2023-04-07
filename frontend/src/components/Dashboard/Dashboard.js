import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom';
import styles from "./Dashboard.module.css"
// import Cart from '../Cart/Cart';
import axios from 'axios';
import { removeUser } from '../../redux/slices/userSlice';


function Dashboard() {
    const navigate = useNavigate();
    const states = useSelector((state)=>state);
    const dispatch = useDispatch()
    const user = states.user;

    async function handleLogout(){
        await axios.get('http://localhost:2000/api/v1/logout'); 
        dispatch(removeUser());
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("time")
        navigate("../")
        // console.log(states) // correct this 
     }
    
    return (
        <div>
            <Link to="/" className={styles.prevbtn}>Back<i className="fa-sharp fa-solid fa-arrow-right"></i></Link>
            <div className={styles.Dashboard}>
                Dashboard
            </div>
            <table className="table">
              <tbody className='text-center'>
                <tr>
                  <th scope="row">1</th>
                  <td>Name</td>
                  <td>{user.name}</td>
                  <td> #button to update name</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>email</td>
                  <td className={styles.tolowercase}>{user.email}</td>
                  <td>#button to update email</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Role</td>
                  <td className={styles.tolowercase}>{user.role}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className={styles.centerbtn}>
                <button type="button" className="btn btn-danger" onClick={handleLogout}>Log Out</button>
            </div>


            {/* Orders Table // Currently Showing items in Cart */}
        {/* <Cart/> */}
            
        </div>
    )
}

export default Dashboard;