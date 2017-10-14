declare var require, module, process;
const mongoose = require('mongoose');
import { Program } from "../../domain/program";
import { User } from "../../domain/user";
var passport = require('passport');
var Users = mongoose.model('User');
var Programs = mongoose.model('Program');

export class UserController {
	register(req: any, res: any, next: any) {
		if (!req.body.name || !req.body.email || !req.body.password) {
			res.status(400)
				.json({ "message": "All fields required" });
			return;
		} else {
			const user = new Users();
			user.name = req.body.name;
			user.email = req.body.email;
			user.setPassword(req.body.password);
			user.save(function (err) {
				let token;
				if (err) {
					res.status(404)
						.json({ "message": err });
				} else {
					token = user.generateJwt();
					res.status(200).json({ "token": token });
				}
			});
		};
	}

	login(req: any, res: any, next: any) {
		if (!req.body.email || !req.body.password) {
			res.status(404)
				.json({ "message": "All fields required" });
			return;
		}
		passport.authenticate('local', function (err, user, info) {
			let token;

			if (err) {
				res.status(404)
					.json({ "message": err });
				return;
			}

			if (user) {
				token = user.generateJwt();
				res.status(200).json({
					"token": token
				});
			} else {
				res.status(401).json({"Error": "Unauthorized"});
			}
		})(req, res, next);
	}
}



