import React, { useContext} from 'react'
import "./Styles/Home.css"
import PostApi from "../utils/PostApi"
import OnScreen from 'onscreen';
const os = new OnScreen(
    {
        tolerance: 0,
        debounce: 100,
        container: window
    }
);
 

function Home() {

    const postApi = useContext(PostApi)
    

    async function fetchPostAppend(){

        const details = {
            startIndex : postApi.postData.length
        }


        let response = await fetch('/posts/getpost',{
            method: "post",
            headers : {
                "Content-type" : 'application/json'
            },
            body : JSON.stringify(details)
        })
        let statusCode =  response.status
        response = await response.json()
       
        if(statusCode === 200){
            postApi.setPostData([...postApi.postData,...response.data])
        }
        if(statusCode === 201){
            // removing intersect listner
           os.destroy()
        }
    }

    
        os.on("enter",".infinite-loader",()=>{
            
            fetchPostAppend()
        })
    
    
  
    async function fetchPostPrepand(){
        let response = await fetch('/posts/getuserlastpost',{
            method: "post",
            })
        response = await response.json()
        
        

        postApi.setPostData([...response,...postApi.postData])
        postApi.setUserPost([])
    }

    

   async function handleSubmit(event){
        event.preventDefault()
        console.log(event.target.title.value)
        const data = {
            title : event.target.title.value,
            content : event.target.content.value
        }

        // console.log(data)
        const response = await fetch("/posts/storepost",{
            method : "POST",
            headers : {
                "Content-type" : 'application/json'
            },
            body : JSON.stringify(data)
        })
        if(await response.status === 200){
            event.target.title.value = ""
            event.target.content.value = ""
            fetchPostPrepand()
        }
        
        
    }
    if(postApi.postData.length === 0){
        fetchPostAppend()
    }

    return (
          <div>
           

              <form className="Outer" onSubmit={handleSubmit}>
    <div className="mb-3">
          
          <input type="text" className="form-control"      
          name="title"
          placeholder="TITLE" required
          />
  </div>
  <div className="mb-3">
    <textarea required placeholder="CONTENT" className="form-control" name="content" rows="08"></textarea>
  </div>
 
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

        {postApi.postData ? 
        <div className="Outer">
            <h1>BloggerMan-Post's</h1>

            {
            postApi.postData.map((elm)=> (
                 <div className="cards" key={elm._id}>
                 <div className="email">
                     <div className="profile"></div>
                     <span>{elm.email}</span>
                 </div>
                 <div className="content">
                    <h4>{elm.title}</h4>
                    {elm.content}
                 </div>
                 </div>


            ))
            }

        </div>    

            :null }

            <div className="infinite-loader " >

            </div>

            </div>

       
    )
}

export default Home
