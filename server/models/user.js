console.log('user model');

var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  admin: {type: Boolean, default: false},
  email: { type: String }, 
}, {timestamps: true})

UserSchema.methods.token = function() {
  console.log("User Schema token method this: ", this);
  var payload = {
    username: this.username,
    admin: this.admin,
    _id: this._id
  };
  console.log("User Schema token method payload: ", payload);

  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  console.log("UserSchema return token: ", token);
  return token;
};

var User = mongoose.model('User', UserSchema);