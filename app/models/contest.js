/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	postData = require('./post'),
	utils = require('../../lib/utils');

contestData = {
    words: [String],
    time_limit: Number,
    genre: [String],
    status: String,
    entries: [postData]
};
var contestSchema = new mongoose.Schema(contestData);
mongoose.model('Contest', contestSchema);