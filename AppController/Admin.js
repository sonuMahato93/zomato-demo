const AdminDetails = require('../Model/adminmodel')
const jwt =require('jsonwebtoken')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');










exports.register= async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { name, email, password, } = req.body;
  
      // Validate user input
      if (!(email && password && name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldAdmin = await AdminDetails.findOne({ email });
  
      if (oldAdmin) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const admin = await AdminDetails.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        role:'admin'
      });
  
      // Create token
       let jwtSecretKey = `${process.env.JWT_SECRET}`;
       const token = jwt.sign(
        { admin_id: admin._id, email },jwtSecretKey,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      admin.token = token;
  
      // return new user
      res.status(201).json(admin);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  };
  
  







exports.login= async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const admin = await AdminDetails.findOne({ email });
  
      if (admin && (await bcrypt.compare(password, admin.password))) {
        // Create token
        let jwtSecretKey = `${process.env.JWT_SECRET}`;
        const token = jwt.sign(
          { admin_id: admin._id, email,  },
          jwtSecretKey,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        admin.token = token;
  
        // user
       return res.status(200).json(admin);
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  };