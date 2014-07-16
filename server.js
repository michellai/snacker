// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    fs = require( 'node-fs' ); //file system
    mongoose = require('mongoose');

//Create server
var app = express();

// // Configure server
// app.configure( function() {
//     //parses request body and populates request.body
//     app.use( express.bodyParser() );

//     //checks request.body for HTTP method overrides
//     app.use( express.methodOverride() );

//     //perform route lookup based on url and HTTP method
//     app.use( app.router );

//     //Where to serve static content
//     app.use( express.static( path.join( application_root, 'site') ) );

//     //Show all errors in development
//     app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
// });


//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
//Connect to database
var post_db = 'mongodb://localhost/post_database';
var db = mongoose.connect( post_db );

function handleError(err, req, res, next) {
  // log it
  console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.send(500);
}

//Schemas

var AuthorSchema =  new mongoose.Schema( {
    name: String,
    id: String
});
var AccountSchema =  new mongoose.Schema( {
    id: String,
    name: String,
    email: String,
    member_since: Date,
    last_seen: Date,
    num_entries: Number,
    wins: Number,
    badges: [String],
    contests: [String]
});
var PostSchema =  new mongoose.Schema( {
    author: AuthorSchema,
    id: String,
    entry: String,
    score: Number
});
var ContestSchema = new mongoose.Schema({
    id: String,
    words: [String],
    time_limit: Number,
    genre: [String],
    status: String,
    entries: [PostSchema]
});

//Models
var Contest = mongoose.model('Contest', ContestSchema);
var Post = mongoose.model('Post', PostSchema);
var Author = mongoose.model('Author', AuthorSchema);
var Account = mongoose.model('Account', AccountSchema);


//db.on('error', handleError);

app.get( '/api/contests', function( request, response ) {
    console.log(request);
    console.log(response);
    var contest = new Contest();
    contest.id = response.id;
    contest.words.push(response.words);
    contest.time_limit = response.time_limit;
    contest.genre.push(response.genre);
    contest.status = response.status;
    contest.entries = response.entries;
    contest.save();
    mockPath = path.join(application_root, '/data-contests.json');
    result = JSON.parse(fs.readFileSync(mockPath, 'utf8'));
    response.json(result);
});

app.get( '/api/accounts', function( request, response ) {
    var account = new Account();
    account.id = response.id;
    account.name = response.name;
    account.email = response.email;
    account.member_since = response.email_since;
    account.last_seen = response.last_seen;
    account.num_entries = response.num_entries;
    account.wins = response.wins;
    account.badges.push(response.badges);
    account.contests.push(response.contests);
    mockPath = path.join(application_root, '/data-students.json')
    result = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
    response.json(result);
});