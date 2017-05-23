console.log('all model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AlltextSchema = new mongoose.Schema({

  home: { type: type: mongoose.Schema.Types.ObjectId, ref: "Hometext" }

})

var Alltext = mongoose.model('Alltext', AlltextSchema);