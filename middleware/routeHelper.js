var db = require("../models");

var routeHelpers = {
	ensureLoggedIn: function(req, res, next){
		if (req.session.id !== null && req.session.id !== undefined){
			return next();
		}
		else {
			res.redirect('/');
		}
	},

	ensureCorrectUser: function(req, res, next){
		db.Wine.findById(req.params.id, function(err,wine){
      if (wine.ownerId !== req.session.id) {
        res.redirect('/vinobeats');
			}
			else {
				return next();
			}
		});
	},

	preventLoginSignup: function(req, res, next){
		if (req.session.id !== null && req.session.id !== undefined){
			res.redirect('/vinobeats');
		}
		else {
			return next();
		}
	}
};
module.exports = routeHelpers;