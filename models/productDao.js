const {appDataSource} =require("./dataSource")

const getAllProducts = async(offset, limit) =>{
    try{
        return await appDataSource.query(`SELECT
            COUNT(r.rating) AS countRating,
            AVG(r.rating) AS avgRating,
            p.id,
            p.category_id categoryId,
            p.name,
            p.price,
            p.description,
            p.thumb_image_url thumbImg,
            i.sales,
            i.stock
        FROM reviews r
        LEFT JOIN products p ON p.id=r.product_id
        LEFT JOIN products_information i ON r.product_id=i.id
        GROUP BY product_id ORDER BY countRating DESC
        LIMIT ${limit} OFFSET ${offset}
        `);
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getProductsByCategory = async(category, offset, limit)=>{
    try{
        return await appDataSource.query(`SELECT
            COUNT(r.rating) AS countRating,
            AVG(r.rating) AS avgRating,
            p.id,
            p.category_id categoryId,
            p.name,
            p.price,
            p.description,
            p.thumb_image_url thumbImg,
            i.sales,
            i.stock
        FROM reviews r
        LEFT JOIN products p ON p.id=r.product_id
        LEFT JOIN products_information i ON r.product_id=i.id
        WHERE p.category_id=${category}
        GROUP BY product_id ORDER BY countRating DESC
        LIMIT ${limit} OFFSET ${offset}
        `);
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory
}

