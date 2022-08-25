const userDao = require("../models/userDao");
const jwt = require("jsonwebtoken")

const validationToken = async(req, res, next) => {
    try{
        const headers = req.headers["authorization"];
        const accessToken = headers.split(" ")[1];
        const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
        const userId = decode.sub;
        const user = await userDao.getNameByEmail(email);

        if(!user) {
            res.status(400).json({message: "USER_NOT_FOUND"})
        } else {
            req.userId = userId;
            next()
        }
    } catch(err){
        next(err);
    }
};

module.exports= {validationToken};