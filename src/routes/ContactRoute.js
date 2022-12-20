const express = require('express');
const app = express()
const router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const ContactModel = require('../models/ContactModel');


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const uploads = multer({storage: storage})

router.post('/<path>',(req,res)=>{

})
let contactResponse
router.post('/',uploads.single('file'), (req,res)=>{
    req.userID="63a1f6c67fede683c41d1ee7"; //after login and JWT creation,delete this and get userID via JWT
    csv().fromFile(req.file.path).then((response)=>{
        for(let i=0;i<response.length;i++){
            response[i].user = req.userID
        }
        ContactModel.insertMany(response,(err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.status(200).json(data)
            }
        })
    })
})
module.exports = router;