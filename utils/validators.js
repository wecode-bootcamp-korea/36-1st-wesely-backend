const validateInteger = (number) => {

    const regExp = new RegExp(
        /^\d*\.?\d+$/
    );

    if (!regExp.test(number)) {
        const err = new Error("IS NOT A POSITIVE INTEGER");
        err.statusCode = 409;
        throw err;
    }
};

module.exports = {
    validateInteger
};