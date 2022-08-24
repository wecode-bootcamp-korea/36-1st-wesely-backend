const productService = require('../services/productService')

const getProducts = async(req, res) => {
    try{
        const {categoryId, limit, offset} = req.query

        if(categoryId){
            const getProductsByCategory = await productService.getProductsByCategory(categoryId, limit, offset);
            return res.status(200).json(getProductsByCategory);
        }
        const getAllProducts = await productService.getAllProducts(limit, offset);
        return res.status(200).json(getAllProducts);
        
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

const getMain = async(req, res) => {
    try{
        const getTop9BySales = await productService.getTop9BySales();
        const getTop9ByRating = await productService.getTop9ByRating();
        return res.status(200).json({
            ratingTop9: getTop9ByRating, 
            salesTop9: getTop9BySales
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

module.exports ={
    getProducts,
    getMain
}