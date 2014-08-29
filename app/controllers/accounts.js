/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Account = mongoose.model('Account'),
	utils = require('../../lib/utils'),
	extend = require('util')._extend;

/**
 * List
 */

exports.list = function( req, res ) {
	console.log(Account.find());
    Account.find({}, function (err, account) {
        if (err) return handleError(err);
        //response.json(JSON.parse(contest));
        console.log('%s', account);
        res.json(account);
	});
};

/**
 * Show
 */

exports.show = function( req, res ) {
    console.log(req.params.id);
    Account.findById(req.params.id, function (err, account) {
        if (err) return handleError(err);
        console.log('%s', account);
        res.json(account);
    });
};

/**
 * Create New Account
 */
 
exports.create = function(req, res) {
	var a = new Account();
	a.name = req.body.name;
	a.email = req.body.email;
	a.password = req.body.password;
	a.member_since = new Date(); //date now
	a.last_seen = a.member_since;
	a.num_entries = 0;
	a.wins = 0;
	a.badges = [];
	a.contests = [];

	a.save(function (err) {
        if (err) return handleError(err);
	});
	console.log('saved author: %s', a._id);

	response.redirect('/api/account/' + a._id);
};