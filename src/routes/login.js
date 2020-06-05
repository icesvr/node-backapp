const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

route.post('/signup', async(req,res)=>{
     
    const { email, password,name} = req.body;
    const profile = {
        nickname:String,
        description:String,
    }
    const newUser = new User({email,password, name,status:0,profile: profile});
    console.log(newUser);
    await newUser.save();
    res.send('Test registro');

});


route.post("/login", async (req,res)=>{
   
    const {email,password} = req.body;

    const userFind = await User.findOne({email});

    if(!userFind) return res.status(400).send({ 'cod' : 400, 'message' : 'No existe usuario','response' : null});

    if(userFind.password !== password) return res.status(200).send({ 'cod' : 200, 'message' : 'Contraseña incorrecta','response' : null})

    const response = {
        id: userFind._id,
        token: jwt.sign({_id : userFind._id}, 'secretkey')}

    res.send(response);
});


module.exports = route;