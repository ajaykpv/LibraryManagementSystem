const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true

    },
    phone:{
        type:Number,
        required:true
    },
    issuedBook:{
        type:ObjectId,
        ref:"Book",
        sparse:true,
        unique:true
    },
    
},{timestamps:true});
module.exports = mongoose.model("User",userSchema);