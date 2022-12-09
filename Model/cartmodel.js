// const mongoose = require('mongoose')
// const {Types} = mongoose;

// var cartSchema = new mongoose.Schema({
   
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'UserDetails',
//        required:true
//     },
//     cartItems:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Products',
//         required:true,
//         quantity:{
//             type:Number,
//             default: 1
//         },
//         price:{
//             type:Number,
//             required:true
//         }
//     }],

    
    
// })


// const cart = mongoose.model('cart',cartSchema);

// module.exports = cart










const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserDetails',
   },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const CartSchema = new Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('cart', CartSchema);