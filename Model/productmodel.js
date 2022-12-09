const mongoose = require('mongoose')
const {Types} = mongoose;

var productSchema = new mongoose.Schema({
   
name:{
    type:String,
    required:true,
    unique:true
},

price:{
    type:Number,
    required:true,
},

description:{
    type:String,
   // required:true,
},

hotel_name:{
    type:String,
    required:true
},

hotel_address:{
    type:String,
    required:true
},
offer:{
    type:Number
},
productPicture:[{
    img:{
        type:String
    }
}],
reviews:[{
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'UserDetails',
    },
    type:String
}],
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'category'
}

    
})


const Products = mongoose.model('Products',productSchema);

module.exports = Products