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
    csv().fromFile(req.file.path).then((response)=>{
        for(let i=0;i<response.length;i++){
            response[i].user = req.userID
        }
        ContactModel.insertMany(response,(err,data)=>{
            if(err){
                res.status(400).json({
                    status:"Failed",
                    Error:err.name,
                    message:err.message
                })
            }else{
                res.status(200).json({
                    status:"Success",
                    message:data
                })
            }
        })
    })
})
router.get('/',async (req,res)=>{
    try {
      const {PageNum=1 ,filter='name' } = req.query
      const allcontact = await ContactModel.find({user:req.userID}).sort(filter).skip((11*(PageNum - 1))).limit(11); //0-11
      // console.log(allcontact)
      res.json({
          status: 'Success',  
          allcontact
      })
    } catch (error) {
      res.json({
          status: 'Failed',
          messege: error.messege
      })
    }
  })

//get the search contact
router.get('/search/:email',async (req,res)=>{
    try {
      const email = req.params.email
      const allcontact = await ContactModel.find({email})
      res.json({
          status: 'Success',  
          allcontact
      })
    } catch (error) {       
      res.json({
          status: 'Failed',
          messege: error.messege
      })
    }
  })

  //



router.delete('/', async (req,res)=>{
    // console.log(req.body)
    const {selectedContactsEmails} = req.body
    if(selectedContactsEmails.length){
        try{
            let response = await ContactModel.deleteMany({email:selectedContactsEmails})
            res.status(200).json({
                status:"Success",
                message: "Deleted Contacts",
                response
            })
        }catch(e){
            res.status(400).json({
                status:"Failed",
                message: e.message
            })
        }
    }else{
        res.status(400).json({
            status:"Failed",
            message: "No contacts selected"
        })
    }   
    

})
module.exports = router;