declare var module;
import * as mongoose from 'mongoose';

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
