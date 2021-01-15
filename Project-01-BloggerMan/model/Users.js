const mongoose =  require('mongoose')
const schema = mongoose.Schema

const Schema = new schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    date : {
        type:String,
        default : Date.now().toString() 
    },
    pwd : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('Users',Schema) 