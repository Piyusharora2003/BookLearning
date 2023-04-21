import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom';
import styles from "./Dashboard.module.css"
// import Cart from '../Cart/Cart';
import axios from 'axios';
import { removeUser } from '../../redux/slices/userSlice';
import isEmail from 'validator/lib/isEmail';


function Dashboard({changeLoginStatus}) {
    const navigate = useNavigate();
    const states = useSelector((state)=>state);
    const dispatch = useDispatch()
    const user = states.user;
    const[editNameMode,setNameEditMode] = useState(false);
    const[editMailMode,setMailMode] = useState(false);
    const [newUserName,AddNewUserName] = useState("");
    const [newUserMail,AddNewUserMail] = useState("");

    async function handleLogout(){
        await axios.get('http://localhost:2000/api/v1/logout'); 
        dispatch(removeUser());
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("time")
        navigate("../")
        changeLoginStatus(false)
        // console.log(states) // correct this 
     }
    
     function changeMailMode(){
       setMailMode(!editMailMode);
     }
     function changeNameMode(){
       setNameEditMode(!editNameMode);
     }
     useEffect(()=>{
     },[editMailMode,editNameMode])

     async function confirmNameChange(){
        const newName = newUserName;
        if(newName.length <= 5){
          alert("Name too short ");
          return;
        }
        const confirmation = window.confirm(`Are you sure you want to change the name to " ${newName} " ?`);
        if (confirmation) {
            const res = await axios.put(`http://localhost:2000/api/v1/updateuser/${user.id}`,{"name":newName});
            if(res.status !== 200){
                alert("Unable to Update User");
            }
            else{
              window.location.reload()
            }
        } else {
          changeNameMode();
        }
     }

    async function confirmMailChange(){
      const newmailaddress = newUserMail;
      // mail validator fails
      if(!isEmail(newUserMail)){
          alert("Please enter correct mail address");
          return;
      }
      const confirmation = window.confirm(`Are you sure you want to change the Email Address to " ${newmailaddress} " ?`);
        if (confirmation) {
            const res = await axios.put(`http://localhost:2000/api/v1/updateuser/${user.id}`,{"email":newmailaddress});
            if(res.status !== 200){
                alert("Unable to Update User");
            }
            else{
              window.location.reload()
            }
        } else {
          changeNameMode();
        }
    }
    return (
        <div className={styles.main}>
            <Link to="/" className={styles.prevbtn}>Back<i className="fa-sharp fa-solid fa-arrow-right"></i></Link>
            <div className={styles.Dashboard}>
                Dashboard
            </div>
            <table className="table table-bordered border-dark">
              <tbody className='text-center'>
                <tr>
                  <th scope="row">1</th>
                  <td>Name</td>
                    <td> 
                      { editNameMode === false ?
                      <span>{user.name}</span> 
                        :
                      <input className='border border-dark ps-2 rounded'  value={newUserName} onChange={(e)=>AddNewUserName(e.target.value)} placeholder={user.name}/>}
                    </td>
                  <td>{ editNameMode === false?
                    <button className={`btn btn-secondary ${styles.editbtn}`} onClick={changeNameMode}>Edit Username <i className="fa-solid fa-pen-to-square"></i></button>
                      :
                    <div>
                        <button className='bg-success me-3 fs-5 rounded' onClick={confirmNameChange}><i className="fa-solid fa-check"></i></button>
                        <button className='bg-danger  ms-2 fs-5 rounded' onClick={changeNameMode}><i className="fa-solid fa-xmark"></i></button>
                    </div>  
                  }
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>email</td>
                  <td className={styles.tolowercase}>
                    { editMailMode === false ?
                      <span  className={styles.tolowercase}>{user.email}</span> 
                        :
                      <input className={`border border-dark ps-2 rounded ${styles.tolowercase}`}  value={newUserMail} onChange={(e)=>AddNewUserMail(e.target.value)} placeholder={user.email}/>
                    }
                  </td>
                  <td>{ editMailMode === false?
                    <button className={`btn btn-secondary ${styles.editbtn}`} onClick={changeMailMode}>Edit Email Address <i className="fa-solid fa-pen-to-square"></i></button>
                      :
                    <div>
                        <button className='bg-success me-3 fs-5 rounded' onClick={confirmMailChange}><i className="fa-solid fa-check"></i></button>
                        <button className='bg-danger  ms-2 fs-5 rounded' onClick={changeMailMode}   ><i className="fa-solid fa-xmark"></i></button>
                    </div>  
                  }
                  </td> 
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
                <button type="button" className="btn btn-danger" onClick={handleLogout} >Log Out</button>
            </div>


            {/* Orders Table // Currently Showing items in Cart */}
        {/* <Cart/> */}
            
        </div>
    )
}

export default Dashboard;