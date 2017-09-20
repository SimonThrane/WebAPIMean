declare var require, module, process;
import { Exercise } from "../../domain/exercise";
var mongoose = require('mongoose');
var Exercisedb = mongoose.model('Exercise');
export class ExercisesController {

    getExercises(req: any, res: any, next: any) {
        //Fetch programs from db
        let exerciseResponse;
        Exercisedb.find()
            .exec((err, exercise) => {
                exerciseResponse = exercise;
                res.send(exerciseResponse);
            }
            );
    }

    getExercise(req: any, res: any, next: any) {
        let exerciseId = req.params.exerciseId;
        //fetch from db based on id
        Exercisedb.findById(exerciseId)
            .exec((err, exercise) => {
                if (err) {
                    res.sendStatus(404);
                } else {
                    res.status(200).send(exercise);
                }
            });
    }

    updateExercise(req: any, res: any, next: any) {
        if (!req.params.exerciseId) {
            res
                .status(404)
                .json({
                    "message": "Not found, exercise is required"
                });
            return;
        }
        let exerciseId = req.params.exerciseId;
        console.log(req.body);
        let update = req.body;        
        Exercisedb.update({ _id: exerciseId },
            update,
            (exercise) => {
                res.status(200).send(exercise);
            });
        // Exercisedb.findByid()
        //     . exec((err, exercise) => {
        //             if(exercise){
        //                 exercise.name = req.body.name;
        //                 exercise.description= req.body.description;
        //                 exercise.isRepetition= req.body.isRepetition;
        //                 exercise.reps= req.body.reps;
        //                 exercise.sets= req.body.sets;
        //                 exercise.time= req.body.time;

        //                 exercise.save((err, exercise) =>{
        //                     if(err){
        //                         res.status(404).json(err);
        //                     }else{
        //                         res.status(200).json(exercise);
        //                     }
        //                 });
        //             }else{
        //                 res.status(404)
        //                     .json({
        //                         "message": "Not found, exercise is required"
        //                     });
        //                 return;
        //             }
        //         }
        //     );
    }

    deleteExercise(req: any, res: any, next: any) {
        let exerciseId = req.params.exerciseId;
        //fetch from db based on id
        if(exerciseId){
            Exercisedb.findByIdAndRemove(exerciseId)
                .exec((err, program) => {
                        if(err){
                            res.status(404).json(err);
                        }
                        res.status(204).json(null);
                    }
                );
        }else{
            res.status(404).json({"message": "No exerciseId"});
        }
    }

    createExercise(req: any, res: any, next: any) {
        //Get from body
        Exercisedb.create({
            name: req.body.name,
            description: req.body.description,
            isRepetition: req.body.isRepetition,
            reps: req.body.reps,
            sets: req.body.sets,
            time: req.body.time,
            create_date: new Date()
        }, (exercise) => {
            res.status(200).send(exercise);
        });
    }
}
