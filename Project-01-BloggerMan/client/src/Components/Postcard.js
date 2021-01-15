import React, {  useRef, useState } from 'react'
import "./Styles/About.css"


function PostCard({title,content,index,deletePost,data}) {

    const form = useRef()
    const inputTitle = useRef()
    const inputContent = useRef()
   
    const [userEdit,setUserEdit] = useState(false)
   

    
    




   async function checks(event){




        setUserEdit((prev)=>!prev)

        event.preventDefault()
        
        if(event.target.btn.value === "edit"){
            event.target.title.removeAttribute("disabled")
            event.target.content.removeAttribute("disabled")
            event.target.title.focus()
            
        }
        else{
            var attTitle = document.createAttribute("disabled")
            var attContent = document.createAttribute("disabled")
            event.target.title.setAttributeNode(attTitle)
            event.target.content.setAttributeNode(attContent)  
            const data = {
                title : event.target.title.value,
                content : event.target.content.value,
                attr : event.target.getAttribute("data-id")
            }
            await fetch('/posts/updatepost',{
               method : "POST",
               headers : {
                "Content-type" : 'application/json'
               },
               body : JSON.stringify(data )
           })
        
            
        }
        
        // event.target.title.select()
        // console.log(inputTitle)
        // console.log(event.target.btn.value)
        console.log(event.target.getAttribute("data-id"))


       

    }

   
    return (
            <div className="outer ">
                <div className="inner ">
                <form ref={form} action="" onSubmit={checks} data-id = {data}>
                <div className="r">
                <input ref={inputTitle} type="text" className="title" name="title" defaultValue = {title} disabled/>
                </div>
                <div className="r">
                <textarea ref={inputContent}  className="content" name="content" id="" cols="30" 
                disabled
                rows = "1"
                defaultValue={content}></textarea>
                </div>
                <div className="r r-btn">
                    <button type="submit" className="edit li" name="btn" value={userEdit ? "ok" : "edit"} >{userEdit ? "Ok" : "Edit"}</button>
                   
                    <li className="delete" 
                    onClick={()=>deletePost(index,data)} >Delete</li>
                </div>
                </form>
                </div>
            </div>
    )
}

export default PostCard
