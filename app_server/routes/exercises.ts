declare var require;
import {ExercisesController} from '../controllers/exercisesController';
var express = require('express');
var router = express.Router();

const exercisesController = new ExercisesController();

/* GET users listing. */
router.get('/', exercisesController.getExercises);
router.get('/:exerciseId', exercisesController.getExercise);
router.post('/', exercisesController.createExercise);

export = router;
