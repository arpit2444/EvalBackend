const jwt = require("jsonwebtoken");

const authorization = (req,res,next)=>{
    const token =req.headers.authorization
    jwt.verify(token, 'masai', function(err, decoded) {
        if(decoded){
            req.body.user= decoded.user;
            next()
        }
      });
}

module.exports={
    authorization
}