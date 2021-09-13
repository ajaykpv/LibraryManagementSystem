const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        required:true

    },
    author:{
        type:String,
        required:true
    },
    issueStatus:{
        type:Boolean,
        required:true
    },
    
},{timestamps:true});
module.exports = mongoose.model("Book",bookSchema);