const users = require('../models/userSchema');
const jsonwebtoken = require('jsonwebtoken');

exports.login = async(req, res)=>{
    try {
        const {username, password} = req.body;
        const existingUser = await users.findOne({username: username});
        if(!existingUser){
            return res.status(404).json("Invalid username");
        }
        const isMatch = await existingUser.comparePassword(password);
        if(!isMatch){
            return res.status(401).json("Invalid password");
        }
        const token = jsonwebtoken.sign({useId: existingUser._id}, process.env.JWT_SECRET);
        res.status(200).json({token:token});

    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error")
    }
}