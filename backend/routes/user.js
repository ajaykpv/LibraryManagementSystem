var express =require('express');
var router = express.Router();
const { check} = require('express-validator');

var {issueBook} = require("../controller/user");
var user = require("../controller/user");
var book=require('../controller/book')
var user_obj= new user()
var book_obj= new book()


router.param("userId",user_obj.getUserById);
router.param("bookId",book_obj.getBookById);

router.post('/user/register',[
    check("Name","NameMust be filled").isLength({min:1}),
    check("phone","Phone must be filled").isNumeric().isLength({min:10,max:13})
],user_obj.regUser);
router.get('/user/view',user_obj.getUsers);
router.post('/user/:userId/issue/:bookId',issueBook);
module.exports = router;