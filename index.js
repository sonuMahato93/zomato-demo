const express = require('express')
const bodyparser = require('body-parser')
const ConnectDB = require('./MongooseConnection/Connection')
const User = require('./AppController/UserSignUp')

const category = require('./AppController/category')
const product = require('./AppController/product')
const multer = require('multer')
const path = require('path')
const {verifyToken} = require('./middleware/auth')
const register = require('./AppController/UserSignUp')
const cart = require('./AppController/cart')
const Admin = require('./AppController/Admin')
const {adminMiddleware} = require('./middleware/auth');
const {userMiddleware} = require('./middleware/auth')



const app = express()
app.use(bodyparser.urlencoded({extended:true}))

ConnectDB()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname), '/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })

  const upload = multer({storage})
//user API
app.post('/register',User.register)
app.post("/login",User.login)

//Addmin API
app.post('/admin/register',Admin.register)
app.post("/admin/login",Admin.login)








app.post('/category',verifyToken,category.create);
app.post('/product',upload.array('productPicture'),product.createProduct)
app.post('/product',verifyToken,product.createProduct)
app.post('/cart',verifyToken,cart.addItemToCart)





 app.get('/categories',category.findall)
 app.get('/product',product.find)






app.listen(8000,()=>{
    console.log("Your app is listing on http://localhost:8000")
})