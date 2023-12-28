const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'The user must have an email'],
        unique: [true, 'The user based on this email is exist, Plesae Login']
    },
    name:{
        type:String,
        minLength:[2, 'The name must be at least 2 characters or more'],
        maxLength:[25, 'The name cannot be over 25 characters'],
        default: 'John Due'
    },
    password: {
        type: String,
        required:[true, 'Please provide a password'],
        minLength:[8, 'The password must contain at least 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required:[true, 'Please confirm your password'],
        validate:{
            validator: function(el){
                return this.password === el
            },
            message: "Passwords don't match"
        } 

    }

})
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10) //encription
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.checkPassword = async function(stringPass, hashPass){
    return await bcrypt.compare(stringPass, hashPass)
}
const User = mongoose.model('User', userSchema)

module.exports = User