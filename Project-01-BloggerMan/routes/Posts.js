const router = require("express").Router()
const { isValidObjectId } = require("mongoose")
const postsSchema = require("../model/Posts.js")
const userSchema = require('../model/Users')

router.post("/storepost",async (req,res)=>{

    console.log("---->from posts",req.body)
    const data = req.body

    try{
    const userEmail = await userSchema.findById(req.session._id)
    console.log(userEmail)
    const stored = await new postsSchema({

        title : data.title,
        content : data.content,
        u_id : req.session._id,
        email : userEmail.email,
        date : Date.now()

    })
    await stored.save()
    res.status(200)
    res.send()
    }
    catch(err){
        res.status(500)
        res.send()
    }




})

router.post("/getpost",paggination,async (req,res)=>{ 
    // console.log(req.pagginationResult) 
    if(req.hasData){
        res.statusCode = 200 
        res.json({
            data : req.pagginationResult
        })
    }else{
        res.statusCode = 201
        res.json({
            data : req.pagginationResult
        })
    }

})


router.post("/getuserpost",Userpaggination,async(req,res)=>{

    if(req.hasData){
        res.statusCode = 200 
        res.json({
            data : req.pagginationResult
        })
    }else{
        res.statusCode = 201
        res.json({
            data : req.pagginationResult
        })
    }


})



async function paggination(req,res,next){

        const length_db =await postsSchema.count()
        const startIndex = parseInt(req.body.startIndex)
        const endIndex = parseInt(req.body.limit) || 5

        let results = {}
        
        // console.log("len db->",length_db,"start-index->",startIndex)

        if(startIndex >= length_db)
        {
          
            console.log("no data")
            req.hasData = false
            results = {
                message : "You reached the last post",
            
          }  
          
        }else{
        req.hasData = true    
        results = await postsSchema.find().sort({date : -1}).limit(endIndex).skip(startIndex).exec()
        }

        req.pagginationResult = results
        next()

    }
async function Userpaggination(req,res,next){

        const length_db =await postsSchema.find({u_id : req.session._id}).count().exec()




        const startIndex = parseInt(req.body.startIndex)
        const endIndex = parseInt(req.body.limit) || 5

        let results = {}
        
        // console.log("len db->",length_db,"start-index->",startIndex)

        if(startIndex >= length_db)
        {
          
            console.log("no data")
            req.hasData = false
            results = {
                message : "You reached the last post",
            
          }  
          
        }else{
        req.hasData = true    
        results = await postsSchema.find({u_id : req.session._id}).sort({date : -1}).limit(endIndex).skip(startIndex).exec()
        // console.log("UserPaggination",results)
        }

        req.pagginationResult = results
        next()

    }


    router.post("/getuserlastpost",async (req,res)=>{
        let results = await postsSchema.find({u_id : req.session._id}).sort({date : -1}).limit(1).exec()

        // console.log(results)
        res.json(results)


    })

    router.post("/updatepost",async(req,res)=>{
        console.log(req.body)

        await postsSchema.updateOne({_id : req.body.attr},{
            $set : {
                title : req.body.title,
                content : req.body.content
            }
        },(num)=>{})
    })

    router.post("/deletepost",async(req,res)=>{
        let id = req.body.ids
        console.log(id)

        try{
            
            await postsSchema.findByIdAndDelete(id,(err,docs)=>{
                if(err) console.log(err)
                console.log("deleted" , docs)
            })
            
        }
        catch(err){

        }
        res.statusCode = 200
        res.send()
    })


module.exports = router

