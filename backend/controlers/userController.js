const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
//@desc register new user
//@access public
//@route POST api/users
const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    if(!name||!email||!password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    else{
        //check if user exists
        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400)
            throw new Error('This user already exists')
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedP = await bcrypt.hash(password, salt)
        // console.log(hashedP)
        //create user
        try{
            const save = await new User({
                name,
                email,
                password:hashedP,
            }).save();
            save?res.status(200).json({token:generateToken(save.id)}):res.status(400).json("user creation failed")
        } catch(err){
            res.status(400).json({message:err.message})
        }
        // if(user){
        //     res.status(201)
            // res.status(201).json({
            //     // name:user.name,
            //     // email:user.email,
            //     token:generateToken(user.id)
            // })
        // } else{
        //     res.status(400).json("ahaa")
        // }
        
    }
})


//@desc register new user
//@access public
//@route POST api/users
const LoginUser = asyncHandler(async (req, res)=>{
    const{email, password} = req.body
    const user = await User.findOne({email})
    if(user&&(await bcrypt.compare(password, user.password))){
        res.json({
            _id:user._id,
            email:user.email,
            name:user.name,
            token:generateToken(user.id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user dara')
    }
    res.json({message:"loggedIn user"})
})
//@desc register new user
//@access public
//@route POST api/users
const LogoutUser =  asyncHandler(async(req, res)=>{
    res.json({message:"register user"})
})
//@desc register new user
//@access public
//@route POST api/users
const getMe =  asyncHandler(async(req, res)=>{
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email
    })
    // console.log(req.user)
})


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'})
}


module.exports = {
    registerUser,
    LoginUser,
    LogoutUser,
    getMe
}