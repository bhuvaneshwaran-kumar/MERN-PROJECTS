import React, { useState } from 'react'
import { Link} from 'react-router-dom'
function Signup() {
    const [create,isCreated] = useState(null)
    const style = {
        maxWidth :'300px',
        padding : '5px',
        margin : 'auto',
        marginTop : '100px'
    }
    const submitForm = async(event)=>{
            event.preventDefault()
            const data = {
                name : event.target.name.value,
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
                console.log(await response.json())
                isCreated(true)
                event.target.reset()     
            }
            else if(response.status === 201){
                isCreated(false)
            }
        }catch(err){

        }

    }
    return (
      
        <div style = {style} >
          

            <form action="/authenticate/signup" onSubmit={submitForm}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Name</label>
                    <input required type="text" name='name' className="form-control" id="exampleInputPassword2"/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input required type="password" className="form-control" id="exampleInputPassword1" name='pwd'/>
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>

                {create === null ?null:create ?<Link to="/login">
                <button className="ml-3 btn btn-primary">Login</button> <br/>
                <p className="mt-3" style={{color :'green'}}>Successfully Signed in</p>
                </Link>  : <p className="mt-3" style={{color :'red'}}>Email already exist... :-(</p>}
            </form>
            
        </div>
    )
}

export default Signup
