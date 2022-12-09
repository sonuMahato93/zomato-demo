const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


var adminSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
//    number:{
//         type:Number,
//         required:true,
//         unique:true
//     },
    email:{
        type:String,
        required:true
    },
    // address:{
    //     type:String,
    //     required:true
    // },
    token:{
        type:String
    },
    password:{
        type:String,
        required:true
     }
})
   
   

const AdminDetails = mongoose.model('AdminDetails',adminSchema);

module.exports = AdminDetails