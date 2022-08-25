const productService = require('../services/productService')

const getProducts = async(req, res) => {
    try{
        const {categoryId, ordering, limit, offset} = req.query

        if(categoryId){
            const getProductsByCategory = await productService.getProductsByCategory(categoryId,ordering, limit, offset);
            return res.status(200).json(getProductsByCategory);
        }
        const getAllProducts = await productService.getAllProducts(ordering, limit, offset);
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

const getDetail = async(req, res) => {
    try{
        const {productId} = req.params;
        const {limit, offset} =req.query;
        
        const getDetailByProductId = await productService.getDetailByProductId(productId);
        const getReviewsByProductId = await productService.getReviewsByProductId(productId, limit, offset);
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

const createCart = async(req, res) => {
    try{
        const userId = req.userId.id;
        const {
            imageId1, quantity1,     
            imageId2, quantity2,
            imageId3, quantity3,
            imageId4, quantity4
        } = req.body;
       await productService.createCart(
            userId,
            imageId1, quantity1,
            imageId2, quantity2,
            imageId3, quantity3,
            imageId4, quantity4
        );

        return res.status(200).json({message: "CREATE_CART_LIST_SUCCESS"});
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
}

module.exports ={
    getProducts,
    getMain,
    getDetail,
    createCart
}