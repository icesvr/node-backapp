const multer = require('multer');
const uuid = require('uuid/v5');
const path = require('path');


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        
        cb(null,'uploads')
    },
    filename : (req, file, cb)=>{
        cb(null, uuid.URL+'-'+Date.now()+path.extname(file.originalname))
    }

});

module.exports = multer({storage});