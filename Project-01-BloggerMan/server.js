require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path') 

const authenticateRouter = require('./routes/authenticate')
const postsRouter = require("./routes/Posts")
const cors = require('cors');

const databaseUrl = process.env.DB_HOST



// For Session 
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


var bodyParser = require('body-parser')
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(cors(""));


mongoose.connect(databaseUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

mongoose.connection.on('connected',()=>{
    console.log("connected... :-)")
    
})
mongoose.connection.on('error',(err)=>console.log(err))

mongoose.set('useFindAndModify', false);

const store = new MongoStore({
    url : databaseUrl,
    collection : 'mySession'
})
store.on('error',(err)=>console.log(err))


app.use(session({
    secret : 'Keyboard cat',
    store : store,
    resave : false,
    saveUninitialized : true
}))




const PORT = process.env.PORT || 8080






// app.use(cors())

app.use(morgan('tiny'))
app.use('/authenticate',authenticateRouter)
app.use("/posts",postsRouter)



app.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}`)
})