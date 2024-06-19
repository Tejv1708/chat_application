import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Please tell us your name !' ],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [ validator.isEmail, 'Please Provide the valid email' ],
    },
    password: {
        type: String,
        required: [ true, 'Please Provide a password' ],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [ true, 'Please confirm your password ' ],
        validate: {
            // This only work on CREATE AND  SAVE !!!
            validator: function ( el ) {
                return el === this.password;
            },
            message: 'Password are not the same',
        },
    },


}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}, )




const User = mongoose.model( 'User', userSchema );
export default User;