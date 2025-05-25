const express = require('express');
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');
const {getToken} = require('../utils/helpers');

router.post('/register', async(req, res) => {

    const {email, password, firstName, lastName, username} = req.body;

    if (!email || !password || !firstName || !lastName || !username) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({email:email});
    if (user) { 
        return res
            .status(403)
            .json({error: "A user with this email already exists"});

    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
        email, 
        password: hashedPassword, 
        firstName,
        lastName, 
        username,
    };
    const newUser  = await User.create(newUserData);
    const token = getToken(email, newUser);

    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

router.post('/login', async(req, res) => {

    const {email, password} = req.body;

    const user= await User.findOne({email:email});
    if(!user){
        return res.status(403).json({error: "No user with this email exists"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(403).json({error:"Incorrect password"});
    }

    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})

module.exports = router;