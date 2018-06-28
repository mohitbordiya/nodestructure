var config = require('../../configs/configs');
var globalMethods = require('../../configs/globals');

var Product = require('../models/product.server.model').Product;

exports.addProduct = (req,res)=>{
    var params = ['name',"description","price","sellerId","available","status","pid"];
    var error  = globalMethods.checkRequireParam(params,req);
    if(error.length>0){
        res.send({status:0, message:error});
    }else{
        Product.find({pid:req.body.pid}).exec((err,data)=>{
            if(err){
                res.send({status:0, message:err});
            }else{
                var newProduct = new Product();
                newProduct={

                };
                newProduct.save((err, result)=>{
                    if(err){
                        res.send({status:0, message:err});
                    }else{
                        res.send({status:0, message:result});
                    }
                });
            }
        });
    }
}