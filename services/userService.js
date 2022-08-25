const userDao = require('../models/userDao');

const bcrypt = require('bcrypt');
const saltRounds = 12;

const jwt = require('jsonwebtoken');

const signUp = async (email, password, phone_number, name) => {
    
    const userCheck = await userDao.emailCheck(email);

    if(!userCheck){
        const err = new Error('INVALID_USER')
        err.statusCode = 409 
        throw err
    }

    const validateEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[a-zA-Z])*\.[a-zA-Z]{2,}$/;
    if(!validateEmail.test(email)) {
        const err = new Error('INVALID_EMAIL')
        err.statusCode = 409
        throw err
    } 

    const validatePassword = /^[0-9a-zA-Z\d@$!%*#?&]{6,}$/;
    if(!validatePassword.test(password)) {
        const err = new Error('INVALID_PASSWORD')
        err.statusCode = 409
        throw err
    } 

    const validatePhoneNumber = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if(!validatePhoneNumber.test(phone_number)) {
        const err = new Error('INVALID_PHONE_NUMBER')
        err.statusCode = 409
        throw err
    } 
    
    const validateName = /^[가-힣]{2,4}$/;
    if(!validateName.test(name)) {
        const err = new Error('INVALID_NAME')
        err.statusCode = 409
        throw err
    } 
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return await userDao.createUser(email, hashedPassword, phone_number, name)
};

const signIn = async (email, password) => {
    const userId = await userDao.getUserIdByEmail(email);
    const loginUser = await userDao.getPasswordByEmail(email)

    const result = await bcrypt.compare(password, loginUser[0].password)
    if(!result) {
        const err = new Error('UNABLE_LOGIN')
        err.statusCode = 409
        throw err
    } 
    return jwt.sign({ sub: userId, exp: Math.floor(Date.now()/1000) + (600*60) }, process.env.JWT_SECRET);   
};

const getNameByEmail = async (email) => {
    return await userDao.getNameByEmail(email);
};

module.exports = {
    signUp, signIn, getNameByEmail
};

