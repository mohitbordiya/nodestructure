var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productSchema = new schema({
    name:{type:String , required:true, unique: true},
    description:{type:String, required:true},
    price:{type:String, required:true},
    sellerId: {type:String, required: true},
    height:{ type: Number, required: true},
    weight : {type:Number, required: true},
    breadth: {type:Number, required: true},
    length: {type:Number, required: true},
    available: {type:Boolean, required: true},
    status: {type: Boolean, required: true, defalut: true},
    deleteStatus: { type:Boolean, required:true, defalut: false},
    image: {type: String}

},{
    timestamps:true
});

var productModel = mongoose.model('products', productSchema);

module.exports = {
    'Product': productModel
}