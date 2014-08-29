
/**
 * Controllers
 */

var accounts = require('../app/controllers/accounts'),
    contests = require('../app/controllers/contests'),
    posts = require('../app/controllers/posts');


module.exports = function (app) {
    /*****************************************/
    /* home                                  */
    /*****************************************/

    app.get('/', function (req, res) {
      res.render('index',
      { title : 'Home' }
      );
    });

    /*****************************************/
    /* /api/contests                            */
    /*****************************************/

    app.get( '/api/contests', contests.list);
    app.get( '/api/contests/:id', contests.show);
    app.post('/api/contests/new',contests.create);
    /*****************************************/
    /* /api/posts                            */
    /*****************************************/

    app.get('/api/posts', posts.list);
    app.get( '/api/posts/:id', posts.show);
    app.post('/api/posts/new', posts.create);
    /*****************************************/
    /* /api/account                          */
    /*****************************************/

    app.get('/api/accounts', accounts.list);
    app.get( '/api/account/:id', accounts.show);
    app.post('/api/account/new', accounts.create);
}