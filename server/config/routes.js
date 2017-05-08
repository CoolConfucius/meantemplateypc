console.log('routes js');
var users = require('./../controllers/users.js');

module.exports = function(app){

  app.get('/users', users.index)
  app.post('/users/register', users.create)
  app.post('/users/login', users.login)
  
  app.get('/users/:username', users.show)
  
  app.put('/users/:username', users.update)
  app.delete('/users/:id', users.delete)


}