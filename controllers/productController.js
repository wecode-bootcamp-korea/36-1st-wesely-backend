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

const getDetail = async(req, res) => {
    try{
        const {productId} = req.params;

        const getDetailByProductId = await productService.getDetailByProductId(productId);
        const getReviewsByProductId = await productService.getReviewsByProductId(productId);
        const getReviewDistribution = await productService.getReviewDistribution(productId);
        const getOptionDataByProductId = await productService.getOptionDataByProductId(productId);
        
        return res.status(200).json({
            optionData: getOptionDataByProductId,
            productDetail: getDetailByProductId,
            reviewsData: getReviewsByProductId,
            reviewsDistribution: getReviewDistribution
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

module.exports ={
    getProducts,
    getDetail
}