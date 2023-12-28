const User = require('../models/userModel')
const AppError = require('./../utils/AppError')
const catchAsync = require('./../utils/catchAsync')
const jwt = require("jsonwebtoken")
const {promisify} = require("util")

exports.signUp = catchAsync( async(req, res, next) =>{
        const newUser = await  User.create(req.body)
        //save in db logic
         res.status(201).json({
            status: 'success',
            data: newUser,
            message: 'The new user has been created successfully'
     })
 }
)

exports.logIn = catchAsync(async(req,res,next) =>{
   
        //token logic:
        //1. Find user based on provided email
        const {email, password} = req.body
        if (!password ||! email)
           return next(new AppError(401,"Are you nut? "))
        const user = await User.findOne({email}).select("+password")
        if (!user)  return next(new AppError(404,"Password or user is not correct"))
        if(user.checkPassword(password, user.password)){
            //3. Create token and send it to the client
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            })
            res.status(201).json({
                status: 'success',
                token,
                message: 'User logged in'
         })
        }
        })

exports.protect = catchAsync(async(req,res,next) =>{
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){return next(new AppError(403, "please log in"))}

    const token = req.headers.authorization.split(" ")[1]

    if(!token){return next(new AppError(403, "please log in"))}

    //token verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    if(!decoded){return next(new AppError(403, "please log in"))}

    const currentUser = await User.findById(decoded.id)

    if(!currentUser){return next(new AppError(403, "please log in"))}

    req.user = currentUser
    next()
})