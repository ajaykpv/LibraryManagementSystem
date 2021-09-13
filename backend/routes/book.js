var express =require('express');
var router = express.Router();

var book = require("../controller/book");
var book_obj= new book()

router.post('/book/register',book_obj.regBook);
router.get('/book/view',book_obj.viewBook);
module.exports = router;