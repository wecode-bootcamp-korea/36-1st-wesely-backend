const productDao = require('../models/productDao')
const validation = require("../utils/validators");

const getAllProducts = async (offset, limit) => {

    validation.validateInteger(offset);
    validation.validateInteger(limit);

    return await productDao.getAllProducts(offset, limit);
};

const getProductsByCategory = async (categoryId, offset, limit) => {

    validation.validateInteger(offset);
    validation.validateInteger(limit);
    validation.validateInteger(categoryId);
    
    return await productDao.getProductsByCategory(categoryId, offset, limit);
};

const getOptionDataByProductId = async (productId) => {
    return await productDao.getOptionDataByProductId(productId);
};

const getDetailByProductId = async (productId) => {
    return await productDao.getDetailByProductId(productId);
};

const getReviewsByProductId = async (productId) => {
    return await productDao.getReviewsByProductId(productId);
};

const getReviewDistribution = async (productId) => {
    return await productDao.getReviewDistribution(productId);
};



module.exports ={
    getAllProducts,
    getProductsByCategory,
    getOptionDataByProductId,
    getDetailByProductId,
    getReviewsByProductId,
    getReviewDistribution
}