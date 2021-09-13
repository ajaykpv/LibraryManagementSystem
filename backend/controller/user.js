
const User = require("../model/user");
const IssueList = require('../model/issueList');
const {validationResult} = require('express-validator');


class userApi{
    constructor(){
        this.Name="";
        this.phone='';
    }
    getUserById=(req,res,next,id)=>{
        User.findById(id)
        .exec((err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"Error in geting user by id!"
                })
            }
            req.user=user;
            next();
        })
    }
    
     regUser = (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({
                error:errors.array()[0].msg
            })
        }
        this.Name=req.body.Name;
        this.phone=req.body.phone;
        const user= new User();
        user.Name=this.Name;
        user.phone=this.phone
        user.save((err,user)=>{
            if(err){
                res.status(400).json({
                    err:err,
                    error:"saving user is failed!"
                })
            }
            res.status(200).json(user);
        })
    } 
     getUsers=(req,res)=>{
        User.find()
        .populate("issuedBook")
        .exec((err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"No users!"
                });
            }
            res.json(user);
        })
    }

    static issueBook=(req,res)=>{
        let book =req.book;
        let user =req.user;
        if(book.issueStatus==1){
            return res.status(400).json({
                error:"can not issue an issued book!"
            })
        }
        if(user.issuedBook!=null){
            return res.status(400).json({
                error:"can not issue more than one book for a person!"
            })
        }
        const issuedBookList= new IssueList();
        issuedBookList.IssuedPerson= user._id;
        issuedBookList.IssuedBook=book._id;
        issuedBookList.IssuedDate=Date.now()
        issuedBookList.save((err)=>{
            if(err){
                return res.status(500).json({
                    err:err,
                    error:"error in saving in booklist!"
                })
            }
            book.issueStatus=1;
            user.issuedBook=book._id;
            user.save((err)=>{
                if(err){
                    return res.status(500).json({
                        error:"error in saving in book status!"
                    })
                }
            })
            book.save((err)=>{
                if(err){
                    return res.status(500).json({
                        error:"error in saving in book status!"
                    })
                }
            })
        })
        res.send().status(200);
        
    }

}
module.exports =userApi;
