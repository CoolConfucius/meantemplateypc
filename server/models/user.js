console.log('user model');

var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},

  email: { type: String }, 
}, {timestamps: true})

UserSchema.methods.token = function() {
  var payload = {
    username: this.username,
    _id: this._id
  };
  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  return token;
};

var User = mongoose.model('User', UserSchema);