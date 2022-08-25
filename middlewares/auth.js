const userDao = require("../models/userDao");
const jwt = require("jsonwebtoken")

const validationToken = async(req, res, next) => {
    try{
        const accessToken = req.headers["authorization"];
        const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
        
        const [userId] = decode.sub;
        
        const user = await userDao.getUserById(userId.id);
       
        if(!user) {
            res.status(400).json({message: "USER_NOT_FOUND"})
        } else {
            req.userId = userId;
            console.log(userId)
            next();
        }
    } catch(err){
        next(err);
    }
};

module.exports= {validationToken};