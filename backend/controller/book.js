const Book = require("../model/book");
const {error} = require("console");

class bookApi{
    constructor(){
        this.bookName="";
        this.author="";
        this.issueStatus=0;
    }
    getBookById=(req,res,next,id)=>{
        Book.findById(id)
        .exec((err,book)=>{
            if(err){
                return res.status(400).json({
                    error:"Error in geting user by id!"
                })
            }
            req.book=book;
            next();
        })
    }

    
     regBook = (req,res)=>{
        const book = new Book()
        this.bookName=req.body.bookName;
        this.author=req.body.author;
        book.bookName=this.bookName;
        book.author=this.author;
        book.issueStatus=this.issueStatus;
        book.save((err,book)=>{
            if(err){
                res.status(400).json({
                    err:err,
                    error:"saving book is failed!"
                })
            }
            res.json(book);
        })
    } 
     viewBook=(req,res)=>{
        Book.find()
        .exec((err,books)=>{
            if(err){
                return res.status(500).json({
                    error:"No Books!"
                });
            }
            res.json(books);
        })
    }
}
module.exports =bookApi;
