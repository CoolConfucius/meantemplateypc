console.log('editables controller js');

var mongoose = require('mongoose');
var Editable = mongoose.model('Editable');
var User = mongoose.model('User');

function EditablesController(){
  console.log("editables controller");
  this.index = function(req, res){
    console.log("editables index");
    Editable.find({}, function(err, editables){
      console.log("Found editable: ", editables);
      if(err) res.status(400).send(err);
      res.json(editables);
    })
  };

  // only create if empty 

  this.testing = function(req, res){
    res.json({data: "yes"})
  }

  this.create = function(req, res){
    console.log("create editable: ", req.body);
    var editable = req.body; 
    var neweditable = new Editable({
      name: editable.name,
      content: editable.content,
      page: editable.page
    });
    neweditable.save(function(err, savedEditable) {
      console.log("neweditable save: ,", err, savedEditable);
      if (err) res.send(err);
      res.json(savedEditable);
    });
  };


  this.update = function(req, res){
    console.log("editables controller update");
    console.log("req params: ", req.params);
    console.log("req body: ", req.body);
    var editeditable = {
      name: req.body.name,
      content: req.body.content,
      page: req.body.page
    }
    Editable.findOneAndUpdate({name: req.params.name}, editeditable, function(err, editable){
      res.json(editable);
    })

  };

  this.delete = function(req, res){
    console.log("editables delete req params ", req.params);
    Editable.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in editables.js');
      } else { 
        console.log('successfully removed a editable!');
        res.end(); 
        // res.json({success: true})
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Editable.findOne({_id: req.params.id}, function(err, editable){
      res.json(editable);
    })
  };
}

module.exports = new EditablesController();