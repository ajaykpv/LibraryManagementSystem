const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const issueListSchema = new mongoose.Schema({
    IssuedPerson:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    IssuedBook:{
        type:ObjectId,
        ref:"Book",
        required:true
    },
    IssuedDate:{
        type:Date,
        required:true
    },
    ClosedDate:{
        type:Date,
        sparse:true
    }

    
},{timestamps:true})
module.exports = mongoose.model("IssueList",issueListSchema);
