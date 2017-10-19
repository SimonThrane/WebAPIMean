declare var require, module, process;
import { ProgramsController } from '../controllers/programsController';
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

const programsController = new ProgramsController();

let token = "secret";
if (process.env.NODE_ENV === 'production') {
	token = process.env.JWT_SECRET;
}

var auth = jwt({
	secret: token,
	userProperty: 'payload'
});

router.post('/', auth, programsController.createProgram);
router.get('/', programsController.getPrograms);

router.get('/:programId', auth, programsController.getProgram);
router.delete('/:programId', auth, programsController.deleteProgram);
router.put('/:programId', auth, programsController.updateProgram);

router.post('/logactivity', auth, programsController.logActivity);
router.post('/activities', auth, programsController.getActivities);

export = router;
