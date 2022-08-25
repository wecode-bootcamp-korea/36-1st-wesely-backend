const {MySQLDatabase} =require("./dataSource")

const getAllProducts = async(ordering,limit,offset) =>{
    try{
        return await MySQLDatabase.query(`
        SELECT
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
        GROUP BY product_id ORDER BY ${ordering} DESC
        LIMIT ${limit} OFFSET ${offset}
        `);
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getProductsByCategory = async(categoryId,ordering,limit, offset)=>{
    try{
        return await MySQLDatabase.query(`
        SELECT
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
        WHERE p.category_id=${categoryId}
        GROUP BY product_id ORDER BY ${ordering} DESC
        LIMIT ${limit} OFFSET ${offset}
        `);
    }
    catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getProductsByRating = async()=>{
    try{
        return await MySQLDatabase.query(`
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
        return await MySQLDatabase.query(`
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
    getAllProducts,
    getProductsByCategory,
    getProductsByRating,
    getProductsBySales
}

