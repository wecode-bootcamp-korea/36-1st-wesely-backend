const homeService = require('../services/homeService')

const getProducts = async(req, res) => {
    try{
        const getTop9BySales = await homeService.getTop9BySales();
        const getTop9ByRating = await homeService.getTop9ByRating();
        return res.status(200).json({
            ratingTop9: getTop9ByRating, 
            salesTop9: getTop9BySales
        });
    } catch (err) {
        return res.status(err.statusCode||500).json({message: err.message});
    }
};

module.exports ={
    getProducts
}