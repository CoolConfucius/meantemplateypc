console.log('editable model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EditableSchema = new mongoose.Schema({
  name: { type: String }, 
  content: { type: String }, 
  page: { type: String }
})

var Editable = mongoose.model('Editable', EditableSchema);