/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	utils = require('../../lib/utils');

accountData = {
    name: String,
    email: String,
    member_since: Date,
    last_seen: Date,
    num_entries: Number,
    wins: Number,
    badges: [String],
    contests: [String]
};
var accountSchema =  new mongoose.Schema(accountData);
mongoose.model('Account', accountSchema);