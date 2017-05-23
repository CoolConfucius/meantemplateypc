console.log('routes js');
var users = require('./../controllers/users.js');
// var hometexts = require('./../controllers/hometexts.js');
var editables = require('./../controllers/editables.js');

module.exports = function(app){

  app.get('/users', users.index)
  app.post('/users/register', users.create)
  app.post('/users/login', users.login)
  
  app.get('/users/:username', users.show)
  
  app.put('/users/:username', users.update)
  app.delete('/users/:id', users.delete)

  app.get('/editables', editables.index)
  app.post('/editables', editables.create)
  app.put('/editables/:name', editables.update)

  // app.get('/hometexts', hometexts.index)
  // app.post('/testing', hometexts.testing)
  
  // app.post('/hometexts/register', hometexts.create)
  // app.post('/hometexts/login', hometexts.login)
  
  // app.get('/hometexts/:username', hometexts.show)
  
  // app.put('/hometexts/:username', hometexts.update)
  // app.delete('/hometexts/:id', hometexts.delete)


}