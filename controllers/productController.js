const productService = require('../services/productService')

const getProducts = async(req, res) => {
    try{
        const {categoryId, offset, limit} = req.query
        if(categoryId){
            const productsByCategory = await productService.getProductsByCategory(categoryId, offset, limit);
            return res.status(200).json(productsByCategory);
        }
        const allProducts = await productService.getAllProducts(offset, limit);
        return res.status(200).json(allProducts);
        
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

module.exports ={
    getProducts
}