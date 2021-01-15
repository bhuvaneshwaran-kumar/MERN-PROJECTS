import React, {  useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {NewUserNav,UserExistNav} from '../src/Components/Nav'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import MyPosts from './Components/MyPosts.js'
import AuthApi from './utils/AuthApi'
import postApi from './utils/PostApi'



 function App() {
  
  const [isLogged,setIsLogged] = useState(null)
  const [userDet,setUserDet] = useState(null)
  const [postData,setPostData] = useState([])
  const [userPost,setUserPost] = useState([])
  
 
  useEffect(()=>{
    fetch('http://localhost:8080/authenticate/islogged',{
      method : "GET",
      credentials : "include"
    })
    .then((res)=>res.json())
    .then((data)=>{
      
      setUserDet(data)
      
      setIsLogged(data.report)
    })
  },[])  

  


  
 
  
  return (

    <AuthApi.Provider value={{isLogged,setIsLogged,userDet,setUserDet,setUserPost,setPostData}}>
   <Router>  
    <Route path='/'>
      {
        (isLogged===null)? null : (isLogged===false) ? <NewUserNav/> : <UserExistNav/>
      }
    </Route>
    <Switch>
        
        
        <Route path='/login'  
           render={(props)=>(
            
              (isLogged === null ) ? null :
              (isLogged === false ) ? <Login {...props} /> :
              <Redirect to='/home' />
            
           )
          }
           
        />
        <Route path='/signup' exact>
           {
             (isLogged === null ) ? null :
             (isLogged === false ) ? <Signup /> :
             <Redirect to='/home' />
           }
        </Route>

        <postApi.Provider value={{userPost,setUserPost,postData,setPostData}}>
        <Route path='/myposts' exact>
          {
             (isLogged === null ) ? null :
             (isLogged === true ) ? <MyPosts/>  : <Redirect to='/login' /> 
             
           }
        </Route>
    
        <Route path='/home' exact>
          {
             (isLogged === null ) ? null :
             (isLogged === false ) ? <Redirect to='/login' /> :
             <Home/>
           } 
        </Route>
        </postApi.Provider>

    
        
        
        <Route path='/*' exact>
          {
             (isLogged === null ) ? null :
             (isLogged === false ) ? <Redirect to='/login' /> :
             <Home/>
           }
        </Route>
    </Switch>
   
   </Router>
 
   </AuthApi.Provider>
   )
}

export default App;
