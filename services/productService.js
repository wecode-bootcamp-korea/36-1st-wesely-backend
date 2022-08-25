const productDao = require('../models/productDao')
const validation = require("../utils/validators");

const getAllProducts = async (ordering, limit, offset) => {

    validation.validateInteger(limit);
    validation.validateInteger(offset);

    return await productDao.getAllProducts(ordering, limit, offset);
};

const getProductsByCategory = async (categoryId, ordering, limit, offset) => {
    
    validation.validateInteger(categoryId);
    validation.validateInteger(limit);
    validation.validateInteger(offset);
    
    return await productDao.getProductsByCategory(categoryId, ordering, limit, offset);
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
