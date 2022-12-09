const jwt = require("jsonwebtoken");



exports.verifyToken = (req, res, next) => {
  let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.User = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};




// exports.userMiddleware =(req,res,next)=>{
//   if(req.user.type !== user){
//     return res.status(400).json({message:"Access Denide"})
//     }
//     next();
  
// }


// exports.adminMiddleware =(req,res,next)=>{
//   if(req.user.about !== admin){
//   return res.status(400).json({message:"Access Denide"})
//   }
//   next();
// }
