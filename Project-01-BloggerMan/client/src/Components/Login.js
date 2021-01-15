import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import AuthApi from '../utils/AuthApi'

function Login() {
    const authApi = useContext(AuthApi)
    const style = {
        margin : 'auto',
        marginTop : '100px',
        maxWidth :'300px',
        padding : '5px'
    }
    const [message,setMessage] = useState(null)
    const [create,isCreated] = useState(null)

    const submitForm = async(event)=>{
        event.preventDefault()
        const data = {
            email : event.target.email.value,
            pwd : event.target.pwd.value
        }
        console.log(data)
        try{
        const response = await 
        fetch(event.target.action,
            {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body : JSON.stringify(data)
        })
        if(response.status === 200){
            const data = await response.json()
            authApi.setUserDet({
                name : data.name,
                email : data.email
            })
            authApi.setIsLogged(true)            
            setMessage(data.msg)
        }
        else if(response.status === 201){
            isCreated(false)
            let msg = await response.json()
            console.log(msg.msg)
            setMessage(msg.msg)
        }
    }catch(err){

    }

}
    return (
        <div style = {style} >
            <form action="/authenticate/login" method="POST" onSubmit={submitForm}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input required type="password" className="form-control" id="exampleInputPassword1" name='pwd'/>
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
                
                {create === null ?null: create ?
                <Redirect to="/home"/>: <p className="mt-3" style={{color :'red'}}>{message}</p>}
            </form>
        </div>
    )
}

export default Login
