/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Contest = mongoose.model('Contest'),
	utils = require('../../lib/utils'),
	extend = require('util')._extend;


/**
 * List
 */
exports.list = function( req, res ) {
    console.log(Contest.find());
    Contest.find({}, function (err, contest) {
        if (err) return handleError(err);
        console.log('%s', contest);
        res.json(contest);
    });
};

 /**
 * Show
 */
exports.show = function( req, res ) {
    console.log(req.params.id);

    Contest.findById(req.params.id, function (err, contest) {
        if (err) return handleError(err);
        console.log('%s', contest);
        res.json(contest);
    });
};

 /**
 * Create New Account
 */
exports.create =  function(req, res) {
        var c = new Contest();
        c.words = req.body.words;
        c.time_limit = req.body.time_limit;
        c.genre = req.body.genre;
        c.status = "new";
        c.entries = [];
        c.save(function (err) {
            if (err) return handleError(err);
        });
        
        console.log('Saved: %s', c._id);
        console.log('words: %s', req.body.words );
        console.log('time_limit: %s', req.body.time_limit );
        console.log('genre: %s', req.body.genre );

        res.redirect('/api/contests/' + c._id);
};