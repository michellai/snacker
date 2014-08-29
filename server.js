
// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    fs = require( 'node-fs' ), //file system
    stylus = require('stylus'),
    nib = require('nib'),
    mongoose = require('mongoose');

//Create server
var app = express();
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

// Configure server
app.configure( function() {
    app.set('views', __dirname + '/app/views/layouts');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(stylus.middleware(
      { src: __dirname + '/public',
        compile: compile
      }
    ));
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    //app.use( express.static( path.join( application_root, 'site') ) );
    app.use(express.static(__dirname + '/public'));
    app.use('public/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
    app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Connect to database
var mongoUri = process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               'mongodb://localhost/post_data';
console.log(mongoUri);
var db = mongoose.connect( mongoUri );

function handleError(err, req, res, next) {
  // log it
  console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.send(500);
}

// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file);
});
// Bootstrap routes
require('./config/routes')(app);

//Start server
var port = process.env.PORT || 4711;

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

// expose app
exports = module.exports = app;

