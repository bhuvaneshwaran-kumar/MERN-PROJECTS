import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';
import Postes from './Postes'

function Template() {
    const [state,setState] = useState({
        body  : '',
        title : ''
        
      })
      const [flash,setFlash] = useState('')
      const [update,setUpdate] = useState([])
      
      const updatePost = ()=>{
        axios({
          url : 'api/getdata',
          method : 'POST'
        })
        .then((response)=>{
          const data = response.data
          console.log(data)
          setUpdate(data)
          })
        .catch(err=>console.log(err))
        
      }
      useEffect(()=>{
        console.log(update)
      },[update])
      useEffect(()=>{updatePost()},[])  
      const submit = (event)=>{
        event.preventDefault()
    
        const payload = {
          title : state.title,
          body : state.body
        }
    
        axios({
          url:'/api/save',
          method:'POST',
          data:payload
        })
        .then((response)=>{
          if(response.status === 200){
            console.log('Date has been successfully sented to the server')
            // console.log(response.data)
            setState({
              body  : '',
              title : ''    
            })
            const message = response.data
            setFlash(message.msg)
            updatePost()
          }
          if(response.status === 500){
            throw({})
          }
          
         })
        .catch(()=>{
          console.log('Ooops there was error occured called CORS error ... :-(')
          setFlash('something went wrong ... :-(')
         
        })
        console.log(payload)
      }
    return (
        <>
        <div className="Template">
         Wellcome to my app
        </div>
        <form action="" onSubmit={submit}>
          <div className="form-input">
            <input 
              type="text"
              name='name' 
              value={state.title}
              onChange = {(event)=>{
                setState({title : event.target.value,
                body : state.body})
              }} 
              
            />
          </div>
          <div className="form-input">
            <textarea name="body" id="" cols="30" rows="10" value={state.body}
            onChange={(event)=>{
              setState({body : event.target.value,title:state.title})
            }} ></textarea>
          </div>
          <button>Submit</button>
        </form>
           <p>{flash}</p>
          {
            update.map((elm,key)=>
              {
                return(<Postes key ={key} data={elm}/>)
              }
            )
          }
           
        </>
     
    )
}

export default Template
