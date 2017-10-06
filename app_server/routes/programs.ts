declare var require, module, process;
import { ProgramsController } from '../controllers/programsController';
var express = require('express');
var router = express.Router();

const programsController = new ProgramsController();

router
    .route('/')
    .get(programsController.getPrograms)
    .post(programsController.createProgram);

router
    .route('/:programId')
    .get(programsController.getProgram)
    .delete(programsController.deleteProgram)
    .put(programsController.updateProgram);


export = router;
