declare var require, module, process;
import { UserController } from '../controllers/usersController';
var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const ctrlAuth = new UserController();

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);