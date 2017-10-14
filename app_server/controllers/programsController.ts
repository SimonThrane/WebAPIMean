declare var require, module, process;
const mongoose = require('mongoose');
import { Program } from "../../domain/program";
import { Exercise } from "../../domain/exercise";
var Exercises = mongoose.model('Exercise');
var Programs = mongoose.model('Program');

export class ProgramsController {
    getPrograms(req: any, res: any, next: any) {
        //Fetch programs from db
        Programs.find()
            .exec((err, programs) => {
                res.send(programs);
            });
    }

    deleteProgram(req: any, res: any, next: any) {
        let programId = req.params.programId;
        console.log(programId);
        //fetch from db based on id
        if(programId){
            Programs.findByIdAndRemove(programId)
                .exec((err, program) => {
                        if(err){
                            res.status(404).json(err);
                        }
                        res.status(204).json(null);
                    }
                );
        }else{
            res.status(404).json({"message": "No programId"});
        }
    }

    getProgram(req: any, res: any, next: any) {
        let programId = req.params.programId;
        //fetch from db based on id
        let programResponse: any;
        let exercisesResponse: any;
        let allExercises: any;
        let promise = new Promise((resolve, reject) => {
            Programs.findById(programId)
                .exec(function (err, programs) {
                    programResponse = programs;
                    Exercises.find({
                        '_id': { $in: programResponse.exercises }
                    }).exec((err, exercises) => {
                        programResponse.exercises = exercises;
                        exercisesResponse = exercises;
                        res.send(programResponse);
                    });
                });
        });
    }

    updateProgram(req: any, res: any, next: any) {
        //Add exercise id to program
        let programId = req.params.programId;
        let update = req.body;
        console.log(update);
        Programs.update({ _id: programId },
            { $addToSet: { exercises: { $each: update.exercises } } },
            update,
            (program) => {
                res.status(200).send(program);
            });
    }

    createProgram(req: any, res: any, next: any) {
        //Get from body
        Programs.create({
            name: req.body.name,
            category: req.body.category,
            exercises: req.body.exercises,
            create_date: new Date()
        }, (program) => {
            res.status(200).send(program);
        });
    }
}
