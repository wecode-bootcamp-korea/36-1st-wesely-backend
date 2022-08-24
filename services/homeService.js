const homeDao = require('../models/homeDao')

const getTop9ByRating = async () => {
    return await homeDao.getProductsByRating();
};

const getTop9BySales = async () => {
    return await homeDao.getProductsBySales();
};

module.exports ={
    getTop9ByRating,
    getTop9BySales
}