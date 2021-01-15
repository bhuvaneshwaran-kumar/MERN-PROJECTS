import React, { useContext} from 'react'
import "./Styles/About.css"
import PostApi from '../utils/PostApi'
import PostCard from './Postcard'
import OnScreen from 'onscreen';
const os = new OnScreen(
    {
        tolerance: 0,
        debounce: 100,
        container: window
    }
);



function MyPosts() {

    const postApi = useContext(PostApi)


  async  function deletePost(index,id){
        // array.splice(0,3)
        
        const ids = {
            ids : ""+id
        }
        console.log(ids)
        postApi.userPost.splice(index,1)
        postApi.setUserPost([...postApi.userPost])
        await fetch("/posts/deletepost",{
            method : "post",
            headers : {
                "Content-type" : 'application/json'
            },
            body : JSON.stringify(ids)
        })
    }


    async function fetchPostAppend(){

        const details = {
            startIndex : postApi.userPost.length
        }


        let response = await fetch('/posts/getuserpost',{
            method: "post",
            headers : {
                "Content-type" : 'application/json'
            },
            body : JSON.stringify(details)
        })
        let statusCode =  response.status
        response = await response.json()
        // console.log(response)
        if(statusCode === 200){
            postApi.setUserPost([...postApi.userPost,...response.data])
        }
        if(statusCode === 201){
            // removing intersect listner
            os.destroy()
            
            
        }

        console.log("userPosr ->",postApi.userPost)
    }

    console.log(postApi.userPost.length,"MY=POSt")

    if( postApi.userPost.length === 0 ){
        fetchPostAppend()
      
    }
    os.on("enter",".infinite-loader",()=>{
        console.log("intersect")
        fetchPostAppend()
    })
    
    


    
    return (
        
        <>
        
            
         <div className="About">


            
          {
              postApi.userPost.map((data,index)=>(

                <PostCard key={data._id} title={data.title} content = {data.content} data = {data._id} index={index} deletePost = {deletePost} />

              ))

          } 

     
                   
       
       
       
        </div> 

        <div className="infinite-loader " >

        </div>
       
        </>
    )
}

export default MyPosts
