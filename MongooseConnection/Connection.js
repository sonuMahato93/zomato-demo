const mongoose = require('mongoose');


const ConnectDB = async()=>{
    try{
        const Connection = await mongoose.connect("mongodb://localhost:27017/collectionName")
        console.log(`MongoDB connected:${Connection.connection.host}`)
    }
    catch(err){
        console.log(err);
        process.exit(1);

    }

}



module.exports= ConnectDB;