const jwt= require("jsonwebtoken");
require("dotenv").config();

const authenticateToken= (req,res,next)=>{
    const token= req.cookie.token;

    if(!token) return res.status(400).send({success:false,msg:"Access Denied"});


    jwt.verify(token,process.env.SecretKey,(err,user)=>{
        if(err){
            return res.status(403).send({ success: false, msg: 'Invalid token.' });
        }

        req.user=user;
        next();
    })
}

module.exports=authenticateToken;