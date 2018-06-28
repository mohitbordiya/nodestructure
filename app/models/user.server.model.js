var mongoose = require('mongoose');
var schema = mongoose.Schema;
var crypto = require('crypto');


var user = new schema({
    firstname : {type:String },
    lastname : {type:String },
    emailId : {type : String},
    password : { type: String},
    photo : {type : String},
    username : {type : String},
    verificationStatus : {type:Boolean ,default:false},
    deleteStatus :{ type:Boolean, default:false},
    status:{type:Boolean, default:false},
    // address : {type : String, required : false},
    // city : {type : String, required : [false, 'why no city']},
    // state : {type : String, required : false},
    mobile : { type: Number},
    verificationToken: {type:String},
    fbId:{type:String},

},{
    timestamps:true
});



var userModel = mongoose.model('User', user);

module.exports = {
    User : userModel
}