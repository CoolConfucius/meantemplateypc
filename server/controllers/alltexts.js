console.log('alltexts controller js');

var mongoose = require('mongoose');
var Alltext = mongoose.model('Alltext');
var User = mongoose.model('User');

function AlltextsController(){
  console.log("alltexts controller");
  this.index = function(req, res){
    console.log("alltexts index");
    Alltext.find({}, function(err, alltexts){
      console.log("Found alltext: ", alltexts);
      if(err) res.status(400).send(err);
      res.json(alltexts);
    })
  };

  // only create if empty 

  this.testing = function(req, res){
    res.json({data: "yes"})
  }

  this.create = function(req, res){
    console.log("create all: ", req.body);
    var all = req.body; 
    var newall = new Alltext({
      home: all.home
    });
    newall.save(function(err, savedAll) {
      console.log("newall save: ,", err, savedAll);
      if (err) res.send(err);
      res.json(savedAll);
    });
  };

  this.toggle = function(req, res){
    Alltext.findOne({_id: req.params.id}, function(err, all){
      all.done = !all.done; 
      all.save(function(err, all){
        if(err){
          console.log('toggle method saving all err ', err);
        } else {
          console.log('successfully toggled an all! ', all);
          res.json(all);
        }
      })    
    })
  };

  this.update = function(req, res){
    var editlink = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    Alltext.findOneAndUpdate({_id: req.params.id}, editlink, function(err, all){
      res.json(all);
    })

  };
  this.delete = function(req, res){
    console.log("alltexts delete req params ", req.params);
    Alltext.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in alltexts.js');
      } else { 
        console.log('successfully removed a all!');
        res.end(); 
        // res.json({success: true})
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Alltext.findOne({_id: req.params.id}, function(err, all){
      res.json(all);
    })
  };
}

module.exports = new AlltextsController();