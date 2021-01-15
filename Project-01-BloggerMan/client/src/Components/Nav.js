import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthApi from "../utils/AuthApi"
import "../Components/Styles/NavLogSig.css"

 function UserExistNav() {
   const authApi = useContext(AuthApi)
  const logOut = async ()=>{
   const res = await fetch("/authenticate/logout",{
     method : "GET"
   })
   if(res.status ===  200){
      authApi.setUserPost([])
      authApi.setPostData([])
      authApi.setIsLogged(false)
   }
  }


    return (
        <div className="container containerNav">
        <nav className="navbar navbar-expand-lg navbar-light bg-light OG-CONT">
          <div className="container-fluid">
            <li className="navbar-brand" >BLOGGER-MAN</li>
            <Link className="navbar-brand btns" to="/home"><span>Home</span></Link>
            <Link className="navbar-brand btns" to="/myposts"><span>My Post</span>
            </Link>

            <li onClick={logOut} className="navbar-brand btns" ><span>Logout</span></li>
          </div>
        </nav>
      </div>
    )
}

function NewUserNav() {
    
  return (
    <div className="container containerNav">
      <nav className="navbar navbar-expand-lg navbar-light bg-light OG-CONT">
        <div className="container-fluid">
          <li className="navbar-brand">BLOGGER-MAN</li>
          <Link to='/signup' className="navbar-brand btns">
             <span>Sign-Up</span>
          </Link>
          <Link to='/login' className="navbar-brand btns">
             <span>Log-in</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export {
  NewUserNav,
  UserExistNav
}

