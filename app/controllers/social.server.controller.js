var config  = require('../../configs/configs');
var globalMethods = require('../../configs/globals');
var User = require('../models/user.server.model').User;
const ObjectId = require('mongodb').ObjectID;
var authTokenData = require('../models/authTokenData.server.model').AuthTokenData;

exports.fb = (req,res)=>{
    if(!req.body.hasOwnProperty('fbId')){
        res.send({status:0, message:"Please send proper data."})
    }
    var fbId = req.body.fbId;
    User.findOne({fbId:fbId, deleteStatus:false},(err, userDetails)=>{
        if(err){
            return res.send({status:0, message:"internal server error"});
        }
        if(userDetails){
            console.log(userDetails)
            let payload = {
                id:userDetails._id
            }
            var token = globalMethods.getToken(payload);
            authTokenData.findOne({userId:ObjectId(userDetails._id)}, (err, authDetail)=>{
                if(err){
                    return res.send({status:0 ,message:err});
                }
                if(authDetail){
                    authTokenData.findByIdAndUpdate(authDetail._id, {token:token},{new:true}, (err,auth)=>{
                        if(err)
                            return res.send({status:0 ,message:err});
                        if(auth)
                            res.send({status:1,access_token:token,data:userDetails,message:'Logged in successfully'});
                    });
                }
                if(!authDetail){
                    var newAuthToken1 = new authTokenData();
                    newAuthToken1.userId = userDetails._id;
                    newAuthToken1.token = token;
                    newAuthToken1.role = 'user';

                    newAuthToken1.save((err,data)=>{
                        if(err){
                            res.send({status:0 ,message:err});
                        }else{
                            res.send({status:1,access_token:token,data:userDetails,message:'Logged in successfully'});
                        }
                    });
                }

            });
            // return res.send({status:0, message:"User login successfully."});
        }
        if(!userDetails){

            let newUser = new User();
            newUser.fbId = fbId;
            newUser.verificationStatus = true
            newUser.save((err, data)=>{
                if(err)
                    return res.send({status:0, message:"internal server error", err:err});
                res.send({status:1, message:"User save successfully."});

            });
        }


    })


}

exports.googleSignup = (req, res)=>{
    if(!req.body.hasOwnProperty('email')){
        res.send({status:0, message:"Please send proper data."})
    }

    var email = req.body.email;
    User.findOne({emailId:email, deleteStatus:false},(err, userDetails)=>{
        if(err){
            return res.send({status:0, message:"internal server error"});
        }
        if(userDetails){
            console.log(userDetails)
            let payload = {
                id:userDetails._id
            }
            var token = globalMethods.getToken(payload);
            authTokenData.findOne({userId:ObjectId(userDetails._id)}, (err, authDetail)=>{
                if(err){
                    return res.send({status:0 ,message:err});
                }
                if(authDetail){
                    authTokenData.findByIdAndUpdate(authDetail._id, {token:token},{new:true}, (err,auth)=>{
                        if(err)
                            return res.send({status:0 ,message:err});
                        if(auth)
                            res.send({status:1,access_token:token,data:userDetails,message:'Logged in successfully'});
                    });
                }
                if(!authDetail){
                    var newAuthToken1 = new authTokenData();
                    newAuthToken1.userId = userDetails._id;
                    newAuthToken1.token = token;
                    newAuthToken1.role = 'user';

                    newAuthToken1.save((err,data)=>{
                        if(err){
                            res.send({status:0 ,message:err});
                        }else{
                            res.send({status:1,access_token:token,data:userDetails,message:'Logged in successfully'});
                        }
                    });
                }

            });
            // return res.send({status:0, message:"User login successfully."});
        }
        if(!userDetails){

            let newUser = new User();
            newUser.emailId = email;
            newUser.verificationStatus = true
            newUser.save((err, data)=>{
                if(err)
                    return res.send({status:0, message:"internal server error", err:err});
                res.send({status:1, message:"User save successfully."});

            });
        }


    })


}

