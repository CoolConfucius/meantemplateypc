console.log('routes js');
var users = require('./../controllers/users.js');
var hometexts = require('./../controllers/hometexts.js');

module.exports = function(app){

  app.get('/users', users.index)
  app.post('/users/register', users.create)
  app.post('/users/login', users.login)
  
  app.get('/users/:username', users.show)
  
  app.put('/users/:username', users.update)
  app.delete('/users/:id', users.delete)


  app.get('/hometexts', hometexts.index)
  app.post('/testing', hometexts.testing)
  // app.post('/hometexts/register', hometexts.create)
  // app.post('/hometexts/login', hometexts.login)
  
  // app.get('/hometexts/:username', hometexts.show)
  
  // app.put('/hometexts/:username', hometexts.update)
  // app.delete('/hometexts/:id', hometexts.delete)


}