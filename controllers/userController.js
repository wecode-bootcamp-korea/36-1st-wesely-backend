const userService = require('../services/userService');

const errorhandler = (err,res) => {
    return res.status(err.statusCode || 500).json({ message : err.message });
};


const signUp = async (req, res) => {
    try {
        
        const { email, password, phone_number, name } = req.body;

        if (!email || !password || !phone_number || !name ) {
            return res.status(404).json({ message : "KEY_ERROR" });
        }

        await userService.signUp(email, password, phone_number, name);
        return res.status(201).json({ message : "USER_CREATED" });
    } catch (err) {
        errorhandler(err, res);
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message : "KEY_ERROR" });
        }
        
        const loginResult = await userService.signIn(email, password);
        return res.status(200).json({ token: loginResult, message : "SUCCESS_LOGIN"});
       
    } catch(err) {
        errorhandler(err, res);
    }
};

const authRouter = async (req, res) => {
    try {
        const { email } = req.body;
    
        const {name} = await userService.getNameByEmail(email);
   
        if(name) return res.status(201).json({ message : "CONNECT_LOGIN", name : name });

        else return res.status(200).json({ message : "CONNECT_SIGNUP" });
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message : err.message });    
    } 
};


module.exports = {
    signUp, signIn, authRouter
};
