// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    fs = require( 'node-fs' ); //file system

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

//Schemas

var PostSchema =  new mongoose.Schema( {
    author: AuthorSchema,
    id: String,
    entry: String,
    score: Number
});
var AuthorSchema =  new mongoose.Schema( {
    name: String,
    id: String
});
var ContestSchema = new mongoose.Schema({
    id: String,
    words: [String],
    time_limit:
    author: String,
    releaseDate: Date
});

//Models
var Contest = mongoose.model('Contest', Contest);
var Post = mongoose.model('Post', Post);


db.on('error', handleError);

app.get( '/api/posts', function( request, response ) {
    console.log(request)
    console.log(response)
    var author = new Author();
    author.name = response.name
    author.save();
    mockPath = path.join(application_root, '/data-apps.json')
    result = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
    response.json(result);
});

app.get( '/api/students', function( request, response ) {

    mockPath = path.join(application_root, '/data-students.json')
    result = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
    response.json(result);
});

app.get( '/api/sections', function( request, response ) {

    mockPath = path.join(application_root, '/data-sections.json')
    result = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
    response.json(result);
});