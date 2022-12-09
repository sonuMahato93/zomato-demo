const category = require('../Model/categorymodel')
const mongoose = require('mongoose')

const {Types} = mongoose;



function createCategories(categories,parentid = null){

    const categorylist =[];
    let catego;
    if(parentid==null){
       catego = categories.filter(cat => cat.parentid == undefined)
    }else{
        catego = categories.filter(cat=> cat.parentid==parentid);
    }
    for(let cate of catego){
        categorylist.push({
            _id:cate._id,
             name:cate.name,
            // food_name:cate.food_name,
            // price:cate.price,
            // food_making:cate.food_making,
            // hotel_name:cate.hotel_name,
            // hotel_address:cate.hotel_address,
            children: createCategories(categories, cate._id)
        })
    }
    return categorylist;
}




exports.create=(req,res)=>{
   
const categoryObj={
    name:req.body.name,
    // food_name:req.body.food_name,
    // price:req.body.price,
    // food_making:req.body.food_making,
    // hotel_name:req.body.hotel_name,
    // hotel_address:req.body.hotel_address
}
   if(req.body.parentid){
    categoryObj.parentid = req.body.parentid
   }
    const cat = new category(categoryObj)
    
 cat.save((error,category)=>{
    if(error) return res.status(400).json({error});
    if(category){
        return res.status(201).json({category})
    }
        
     
   })
}
     






exports.findall=(req,res)=>{
    category.find() 
    .exec((error,categories)=>{
        if(error) return res.status(400).json({error});

        if(categories){
            const categorylist = createCategories(categories)
            res.status(200).json({categorylist})
        }
    })          
}










  