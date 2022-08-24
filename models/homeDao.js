const {appDataSource} =require("./dataSource")

const getProductsByRating = async()=>{
    try{
        return await appDataSource.query(`
        SELECT
            COUNT(r.rating) AS countRating,
            AVG(r.rating) AS avgRating,
            p.id,
            p.name,
            p.price,
            p.thumb_image_url thumbImg
        FROM reviews r
        LEFT JOIN products p ON p.id=r.product_id
        GROUP BY product_id ORDER BY avgRating DESC
        LIMIT 9
        `);
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getProductsBySales = async()=>{
    try{
        return await appDataSource.query(`
        SELECT
            COUNT(r.rating) AS countRating,
            AVG(r.rating) AS avgRating,
            p.id,
            p.name,
            p.price,
            p.thumb_image_url thumbImg
        FROM reviews r
        LEFT JOIN products p ON p.id=r.product_id
        LEFT JOIN products_information pi ON p.product_information_id=pi.id
        GROUP BY product_id ORDER BY pi.sales DESC
        LIMIT 9
        `);
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    getProductsByRating,
    getProductsBySales
}
