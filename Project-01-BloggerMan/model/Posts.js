const schema = require('mongoose').Schema

const postSchema = new schema({
    u_id : String,
    date : {
        type : String
    },
    title : String,
    content : String,
    email : String
})

module.exports = require('mongoose').model('Posts',postSchema)


