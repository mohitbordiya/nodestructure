var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Schema = require('mongoose').Schema;

var authSchema = new schema({

    token : {type:String},
    role:{type:String},
    userId:   { type: Schema.Types.ObjectId, ref: 'users' },
},
{   
    collection : 'authtokendata',
    timestamps:true
}
);

var authModel = mongoose.model('authtokendata',authSchema);

module.exports = {
    AuthTokenData : authModel
}