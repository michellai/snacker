/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Post = mongoose.model('Post'),
	utils = require('../../lib/utils'),
	extend = require('util')._extend;

/**
 * List
 */
exports.list = function( req, res ) {
    console.log(Post.find());
    Post.find({}, function (err, post) {
        if (err) return handleError(err);
        console.log('%s', post);
        res.json(post);
    });
};

 /**
 * Show
 */
exports.show = function( req, res ) {
    console.log(req.params.id);

    Post.findById(req.params.id, function (err, post) {
        if (err) return handleError(err);
        console.log('%s', post);
        res.json(post);
    });
};

 /**
 * Create New Account
 */
 exports.create = function(req, res) {
    var p = new Post();
    var a = new Author();
    a.name = req.body.author.name;
    a.save(function (err) {
        if (err) return handleError(err);
    });
    console.log('saved author: %s', a._id);

    p.author = a;
    p.entry = req.body.entry;
    p.score = req.body.score;
    p.save(function (err) {
        if (err) return handleError(err);
    });
    console.log('saved entry: %s', p._id);
    console.log('saved author: %s', a._id);
    console.log('entry: %s', p.entry);
    res.redirect('/api/posts/' + p._id);
};