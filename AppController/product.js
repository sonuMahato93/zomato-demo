const Products = require('../Model/productmodel');
const multer = require('multer')


exports.createProduct= (req,res)=>{
   
//const productPictures = [];

// if(req.files.length>0){
//     productPictures = req.files.map(file=>{
//         return {img:file.filename}
//     })
//}
    const product = new Products({
        name:req.body.name,
        price:req.body.price,
        food_type:req.body.food_type,
        food_making:req.body.food_making,
        hotel_name:req.body.hotel_name,
        hotel_address:req.body.hotel_address,
        category:req.body.category,
        reviews:req.body.reviews,
       // productPicture:req.body.productPicture,
        offer:req.body.offer

    })

    //  res.status(200).json({ body:req.body})
   
    
 product.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
      return res.status(500).send({message:err.message ||"Some error occurred while creating a create operation "})
    })
}




exports.find=(req,res)=>{
    Products.find()           
    .populate("category")
    .then(product=>{
        res.send(product)
    })
    .catch(err=>{
        res.status(500).send({message:"Cannot find the users"})
    })
}