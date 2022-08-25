const productDao = require('../models/productDao')
const validation = require("../utils/validators");

const getAllProducts = async (limit, offset) => {

    validation.validateInteger(limit);
    validation.validateInteger(offset);

    return await productDao.getAllProducts(limit, offset);
};

const getProductsByCategory = async (categoryId, limit, offset) => {
    
    validation.validateInteger(categoryId);
    validation.validateInteger(limit);
    validation.validateInteger(offset);
    
    return await productDao.getProductsByCategory(categoryId, limit, offset);
};

const getTop9ByRating = async () => {
    return await productDao.getProductsByRating();
};

const getTop9BySales = async () => {
    return await productDao.getProductsBySales();
};
module.exports ={
    getAllProducts,
    getProductsByCategory,
    getTop9ByRating,
    getTop9BySales
}
