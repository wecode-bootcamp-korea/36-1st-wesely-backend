const productDao = require('../models/productDao')

const getAllProducts = async (offset, limit) => {
    return await productDao.getAllProducts(offset, limit);
};

const getProductsByCategory = async (categoryId, offset, limit) => {
    return await productDao.getProductsByCategory(categoryId, offset, limit);
};

module.exports ={
    getAllProducts,
    getProductsByCategory
}