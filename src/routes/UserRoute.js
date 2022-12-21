const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const app = express()
// const { body, validationResult } = require('express-validator');
const router = express.Router();
const UserModel = require("../models/UserModel")

router.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const userData = await UserModel.findOne({ email });
    if (userData) {
        // is await requred for bcrypt???
        let result = await bcrypt.compare(password, userData.password);
        if (result) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 10) + 60 * 60,
                data: userData._id,
            },
                process.env.SECRET
            );
            res.status(200).json({
                Status: "Successful",
                token: token,
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: "Wrong Password",
            });
        }
    }
    else {
        res.status(400).json({
            status: "failed",
            message: "No user Found",
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        let userData = await UserModel.findOne({ email });
        if (userData) {
            return res.status(409).json({
                status: "Failed",
                message: "User already exists with the given email"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords are not matching');
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            userData = await UserModel.create({
                email: email,
                password: hash,
                name: email.split("@")[0]
            });
            res.json({
                status: "Success",
                message: "User succesfully created",
                userData
            })
        })
    }
    catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
});

router.get('/get', async (req, res) => {
    const userData = await UserModel.find();
    try{
        res.json({
            status: "Success",
            message: "User succesfully created",
            userData
        })
    }
    catch(e){
        res.json({
            status: "Failed",
            message: e.message
        })
    }

})
module.exports = router;