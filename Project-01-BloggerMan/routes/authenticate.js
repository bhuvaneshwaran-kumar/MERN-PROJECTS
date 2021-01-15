const express= require('express')
const router = express.Router()
const Userschema = require('../model/Users')
const bcrypt = require('bcrypt')


router.get('/islogged',async(req,res)=>{
  console.log(req.session.id)  
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', 'true')
  if(req.session.isAuth){
    const data = await Userschema.findById(req.session._id)
    // console.log(data)
    res.json({
      report : true,
      name : data.name,
      email : data.email
    })
  }else{
    console.log("here")
      res.json({
        report : false
    })
  }
  
}
)

router.post('/login',async (req,res)=>{
  try{
    console.log(req.body)
    console.log(req.body.pwd)
    // Check if the email is already exist..
    const existEmail = await Userschema.findOne({email : req.body.email})
    if(existEmail){
      console.log("Exist")
      console.log(existEmail.pwd)
      console.log(await bcrypt.hash(req.body.pwd,10))
      const password = req.body.pwd
      if(await bcrypt.compare(password,existEmail.pwd)){
        req.session.isAuth = true
        req.session._id = existEmail._id
        console.log("match")
      res.statusCode = 200
      res.json({
        msg : "successfully Logged in...:-)",
        name : existEmail.name,
        email : existEmail.email
      })
      }else{
        // Incorrect Password
        res.statusCode = 201
        res.json({
          msg : "Password is inCorrect ."
        }) 
      }
     
    }
    else{
      // User Not Exist
      res.statusCode = 201
      res.json({
        msg : "Email is invalid"
      }) 
    }

  }catch(err){
    // res.(err)
  }
  



})

router.post('/signup',async(req,res)=>{
    console.log("from post signup",req.body)
    console.log(req.body.pwd)
    const data = req.body

    


    // if email is not exist we procied to store it in database...
    try{
      // Check if the email is already exist..
      const existEmail = await Userschema.findOne({email : data.email})
      if(existEmail){
        res.statusMessage = "account  Already exist...:-)"
        res.statusCode = 201
        res.json({
          msg : "account Already Exist...:-)"
        })
      }

      const storeUserIndb = await new Userschema({
        name : data.name,
        email : data.email,
        pwd : await bcrypt.hash(req.body.pwd,10)
      })
      storeUserIndb.save()
      res.statusMessage = "account successfully created...:-)"
      res.statusCode = 200
      res.json({
        msg : "account successfully created...:-)"
      })
      
    }catch(err){
      res.send(err)
    }
   
})

router.get("/logout",(req,res)=>{
  req.session.destroy()
  res.statusCode = 200
  res.json({
    msg : "done"
  })
})




module.exports = router