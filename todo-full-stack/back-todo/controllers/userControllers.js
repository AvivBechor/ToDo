const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require("./../utils/AppError")

exports.getUsers = catchAsync( async (req, res, next) =>{
    const users = await User.find()
        res.status(200).json({
            status: 'success',
            data: users
        })
    }
    )
 exports.getUser =catchAsync( async (req, res, next) =>{
        //here access db to bring users
        const id = req.params.id
        if(!req.user._id == req.id){return next(new AppError(403, "you can only view your own information"))}
        const user = await User.findById(id)
                res.status(200).json({
                    status: 'success',
                    user
                })
            
            }
 )
 