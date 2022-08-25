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

const getDetailByProductId = async (productId) => {
    return await productDao.getDetailByProductId(productId);
};

const getReviewsByProductId = async (productId, limit, offset) => {
    return await productDao.getReviewsByProductId(productId, limit, offset);
};

const getReviewDistribution = async (productId) => {
    return await productDao.getReviewDistribution(productId);
};

const getOptionDataByProductId = async (productId) => {
    return await productDao.getOptionDataByProductId(productId);
};


const createCart = async (   
    userId,
    imageId1, quantity1,
    imageId2, quantity2,
    imageId3, quantity3,
    imageId4, quantity4
    ) => 
    {
    return await productDao.createCartList(
        userId,
        imageId1, quantity1,
        imageId2, quantity2,
        imageId3, quantity3,
        imageId4, quantity4
    );
};

module.exports ={
    getProductsByCategory,
    getAllProducts,
    getTop9ByRating,
    getTop9BySales,
    getDetailByProductId,
    getReviewsByProductId,
    getReviewDistribution,
    getOptionDataByProductId,
    createCart
}