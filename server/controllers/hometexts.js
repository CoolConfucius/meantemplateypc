console.log('hometexts controller js');

var mongoose = require('mongoose');
var Hometext = mongoose.model('Hometext');
var User = mongoose.model('User');

function HometextsController(){
  console.log("hometexts controller");
  this.index = function(req, res){
    console.log("hometexts index");
    Hometext.find({}, function(err, hometexts){
      console.log("Found hometext: ", hometexts);
      if(err) res.status(400).send(err);
      res.json(hometexts);
    })
  };

  // only create if empty 

  this.testing = function(req, res){
    res.json({data: "yes"})
  }

  this.create = function(req, res){
    console.log("create home: ", req.body);
    var home = req.body; 
    var newhome = new Hometext({
      missionp: home.missionp
    });
    newhome.save(function(err, savedHome) {
      console.log("newhome save: ,", err, savedHome);
      if (err) res.send(err);
      res.json(savedHome);
    });
  };

  this.toggle = function(req, res){
    Hometext.findOne({_id: req.params.id}, function(err, home){
      home.done = !home.done; 
      home.save(function(err, home){
        if(err){
          console.log('toggle method saving home err ', err);
        } else {
          console.log('successfully toggled an home! ', home);
          res.json(home);
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
    Hometext.findOneAndUpdate({_id: req.params.id}, editlink, function(err, home){
      res.json(home);
    })

  };
  this.delete = function(req, res){
    console.log("hometexts delete req params ", req.params);
    Hometext.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in hometexts.js');
      } else { 
        console.log('successfully removed a home!');
        res.end(); 
        // res.json({success: true})
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Hometext.findOne({_id: req.params.id}, function(err, home){
      res.json(home);
    })
  };
}

module.exports = new HometextsController();