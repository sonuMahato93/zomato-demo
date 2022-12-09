const mongoose = require('mongoose')
const {Types} = mongoose;

var categorySchema = new mongoose.Schema({
   
    name:{ 
        type:String,
        require:true
    },
parentid:{
    type:String,
},

// food_name:{
//     type:String,
//     require:true
// },

// price:{
//     type:Number,
//     require:true,
// },

// food_making:{
//     type:String
// },

// hotel_name:{
//     type:String,
//     require:true
// },

// hotel_address:{
//     type:String,
//     require:true
// }

    
})


const category = mongoose.model('category',categorySchema);

module.exports = category