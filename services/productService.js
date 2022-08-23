const productDao = require('../models/productDao')

const getAllProducts = async (offset, limit) => {
    return await productDao.getAllProducts(offset, limit);
};

const getProductsByCategory = async (category, offset, limit) => {
    return await productDao.getProductsByCategory(category, offset, limit);
};

module.exports ={
    getAllProducts,
    getProductsByCategory
}