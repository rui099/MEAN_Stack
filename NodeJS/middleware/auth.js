require("dotenv").config();
const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
const header = req.headers.authorization;

if(typeof header !== 'undefined'){
    const bearer = header.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.ACESS_TOKEN_SECRET,(err,authD) => {
        if(err){
            res.sendStatus(401);
        }else authD;
    });
    next();
}else{
    res.sendStatus(403);
};
}