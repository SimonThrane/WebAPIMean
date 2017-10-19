declare var require, module, process;
import { UserController } from '../controllers/usersController';
var express = require('express');
var router = express.Router();

const ctrlAuth = new UserController();

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


export = router;
