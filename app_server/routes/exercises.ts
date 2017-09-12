declare var require;
import {ExercisesController} from '../controllers/exercisesController';
var express = require('express');
var router = express.Router();

const exercisesController = new ExercisesController();

router
    .route('/')
    .get(exercisesController.getExercises)
    .post(exercisesController.createExercise);

router
    .route('/:exerciseId')
    .get(exercisesController.getExercise)
    .put(exercisesController.updateExercise)
    .delete(exercisesController.deleteExercise);
export = router;

