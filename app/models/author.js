/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	utils = require('../../lib/utils');

authorData = {
    name: String,
    id: String
};
authorSchema =  new mongoose.Schema(authorData);
mongoose.model('Author', authorSchema);