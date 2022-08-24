const { database } = require('./database');

const errorHandler = () => {
    const err = new Error('INVALID_DATA_INPUT');
    err.statusCode = 500; 
    throw err;
};
 
const createUser = async (email, hashedPassword, phone_number, name) => {
    try{
        return await database.query(`    
            INSERT INTO users (
                email,
                password,
                phone_number,
                name
            ) VALUES (?, ?, ?, ?);`,
            [email, hashedPassword, phone_number, name]  
        );
    } catch (err) {
        errorHandler();
    }
};
const getUserByEmail = async (email) => {
    try {
        return await database.query(`
        SELECT  
        password FROM users
        WHERE email = "${email}";
        `)
    } catch (err) {
        errorHandler();
    }
};


const userCheck = async (email) => {
    try {

        return await database.query(`
            SELECT
            email
            FROM users
            WHERE email = "${email}";
        `)
    } catch (err) {
        
        errorHandler();
    }
};


const emailCheck = async(email) => {
    try {
        const existentEmail = await database.query(`  
        SELECT EXISTS
        (SELECT email FROM users
        WHERE email = "${email}");
        `)

        const getName = await database.query(`  
        SELECT
        name FROM users
        WHERE email = "${email}";
        `)
        
       const value = Number(Object.values(existentEmail[0])[0])
      
       if (value === 0) {
        return false;
       } 
        return getName;

  
    } catch (err) {
        errorHandler();
    }

};



module.exports = {
    createUser, getUserByEmail, userCheck, emailCheck
};
