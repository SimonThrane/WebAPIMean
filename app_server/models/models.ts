declare var module;
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';


const exerciseSchema = module.exports.exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
    },
    creator: String,
    description: String,
    isRepetition: Boolean,
    time:{
        type: Number,
        min: 0,
        max: 3600
    }
});

const programSchema = module.exports.programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [],
    category: String,
    creator: String,
    create_date: Date
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    programs: []
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(24).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
    10000, 128, 'sha512').toString('hex');
    };

// userSchema.methods.generateJwt = function() {
//     let expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7);
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         name: this.name,
//         exp: parseInt(expiry.getTime() / 1000),
//     }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
// };

module.exports.userSchema = userSchema;
