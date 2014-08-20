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
var post_db = 'mongodb://localhost/post_data';
console.log(post_db);
var db = mongoose.connect( post_db );

function handleError(err, req, res, next) {
  // log it
  console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.send(500);
}

//Schemas
authorData = {
    name: String,
    id: String
};
authorSchema =  new mongoose.Schema(authorData);

postData = {
    author: authorData,
    entry: String,
    score: Number
};
var postSchema =  new mongoose.Schema(postData);

contestData = {
    words: [String],
    time_limit: Number,
    genre: [String],
    status: String,
    entries: [postData]
};
var contestSchema = new mongoose.Schema(contestData);

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

//Models
var Contest = mongoose.model('Contest', contestSchema);
var Post = mongoose.model('Post', postSchema);
var Author = mongoose.model('Author', authorSchema);
var Account = mongoose.model('Account', accountSchema);

//db.on('error', handleError);
//var contest = new Contest(data);
//contest.save();
app.use(express.bodyParser());

/*****************************************/
/* /api/contests                            */
/*****************************************/

app.get( '/api/contests', function( request, response ) {
    console.log(Contest.find());
    Contest.find({}, function (err, contest) {
        if (err) return handleError(err);
        //response.json(JSON.parse(contest));
        console.log('%s', contest);
        response.json(contest);
    });
});
app.get( '/api/contests/:id', function( request, response ) {
    console.log(request.params.id);

    Contest.findById(request.params.id, function (err, contest) {
        if (err) return handleError(err);
        //response.json(JSON.parse(contest));
        console.log('%s', contest);
        response.json(contest);
    });
});
app.post('/api/contests/new', function(request, response) {
    var c = new Contest();
    c.words = request.body.words;
    c.time_limit = request.body.time_limit;
    c.genre = request.body.genre;
    c.status = "new";
    c.entries = [];
    c.save(function (err) {
        if (err) return handleError(err);
        //tried logging, always undefined
        //turns out model cannot have _id attr set to String
        
    });
    
    console.log('Saved: %s', c._id);
    console.log('words: %s', request.body.words );
    console.log('time_limit: %s', request.body.time_limit );
    console.log('genre: %s', request.body.genre );
    //console.log('id: %s', contestId);

    //redirect to contest/id
    response.redirect('/api/contests/' + c._id);
    //response.end("It worked");
});
/*****************************************/
/* /api/posts                            */
/*****************************************/

app.get('/api/posts', function( request, response ) {
    console.log(Post.find());
    Post.find({}, function (err, post) {
        if (err) return handleError(err);
        //response.json(JSON.parse(contest));
        console.log('%s', post);
        response.json(post);
    });
});
app.get( '/api/posts/:id', function( request, response ) {
    console.log(request.params.id);

    Post.findById(request.params.id, function (err, post) {
        if (err) return handleError(err);
        //response.json(JSON.parse(contest));
        console.log('%s', post);
        response.json(post);
    });
});
app.post('/api/posts/new', function(request, response) {
    var p = new Post();
    var a = new Author();
    a.name = request.body.author.name;
    a.save(function (err) {
        if (err) return handleError(err);
    });
    console.log('saved author: %s', a._id);

    p.author = a;
    p.entry = request.body.entry;
    p.score = request.body.score;
    p.save(function (err) {
        if (err) return handleError(err);
    });
    console.log('saved entry: %s', p._id);
    console.log('saved author: %s', a._id);
    console.log('entry: %s', p.entry);
    response.redirect('/api/posts/' + p._id);
});
/*****************************************/
/* /api/accounts                         */
/*****************************************/

app.get('/api/accounts', function( request, response ) {
    console.log(Account.find());
    Account.find({}, function (err, account) {
        if (err) return handleError(err);
        //response.json(JSON.parse(contest));
        console.log('%s', account);
        response.json(account);
    });
});
app.get( '/api/account/:id', function( request, response ) {
    console.log(request.params.id);

    Account.findById(request.params.id, function (err, account) {
        if (err) return handleError(err);
        //response.json(JSON.parse(contest));
        console.log('%s', account);
        response.json(account);
    });
});
app.post('/api/account/new', function(request, response) {
    var a = new Account();
    a.name = request.body.name;
    a.email = request.body.email;
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
});
/*****************************************/
/* /api/account                          */
/*****************************************/


//app.post()
//app.put( )
//app.post( 'api/')