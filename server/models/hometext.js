console.log('home model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var defaultobj = {
//   h2_1: "Raise Funds, Volunteer, Promote Community Awareness &amp; Build Partnerships with the local business community",
//   ourpurpose: "Our Purpose",
//   mission: "MISSION",
//   missionp: "Recognizing the desire of young professionals in Santa Clara County to contribute to the welfare of their communities and connect with like-minded peers, the VMC Foundation is introducing The Young Professional Council (YPC). YPC supports the efforts of the VMC Foundation to provide critical funds for the creation of the Women and Children’s Center at VMC. The focus of the Young Professional Council is to raise funds, volunteer, promote community awareness, and build partnerships with the local business community."
// }; 




var HometextSchema = new mongoose.Schema({

  h2_1: { type: String }, 
  ourpurpose: { type: String }, 
  mission: { type: String }, 
  missionp: { type: String }

})

var Hometext = mongoose.model('Hometext', HometextSchema);