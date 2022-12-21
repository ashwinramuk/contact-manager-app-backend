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

router.get('/',async (req,res)=>{
    try {
      // console.log(req.query)
      const {PageNum ,filter } = req.query
      const allcontact = await ContactModel.find().sort(filter).skip((11*(PageNum - 1))).limit(11); //0-11
      // console.log(allcontact)
      res.json({
          status: 'susecess',  
          allcontact
      })
    } catch (error) {
      res.json({
          status: 'failed',
          messege: error.messege
      })
    }
  })

//get the search contact
router.get('/search/:email',async (req,res)=>{
    try {
      const email = req.params.email
      console.log(email)
      const allcontact = await ContactModel.find({email})
      res.json({
          status: 'susecess',  
          allcontact
      })
    } catch (error) {       
      res.json({
          status: 'failed',
          messege: error.messege
      })
    }
  })

  //


module.exports = router;