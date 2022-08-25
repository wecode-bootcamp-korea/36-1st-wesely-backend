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

const getOptionDataByProductId= async(productId)=>{
    try {
        return await MySQLDatabase.query(
        `SELECT Distinct
            ratings.avgRating,
            p.name productName,
            p.price,
            p.description,
            p.thumb_image_url thumbImg
        from products_images pImg
        left join images i on pImg.image_id=i.id
        left join products p on p.id=pImg.product_id
        left join products_information pi on pi.id = p.id
        left join 
            (select 
                r.product_id,
                COUNT(r.rating) AS countRating,
                AVG(r.rating) AS avgRating
                from reviews r GROUP BY product_id) AS ratings 
            on ratings.product_id=pImg.product_id
        where p.id=${productId}
        `
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getDetailByProductId= async(productId)=>{
    try {
        return await MySQLDatabase.query(
        `SELECT
            ratings.countRating,
            ratings.avgRating,
            ratings.product_id productId,
            i.id imageId,
            i.options,
            i.image_url optionImg,
            pi.sales,
            pi.stock,
            p.category_id categoryId,
            p.name productName,
            p.price,
            p.description,
            p.description_image_url descImg,
            p.thumb_image_url thumbImg
        from products_images pImg
        left join images i on pImg.image_id=i.id
        left join products p on p.id=pImg.product_id
        left join products_information pi on pi.id = p.id
        left join 
            (select 
                r.product_id,
                COUNT(r.rating) AS countRating,
                AVG(r.rating) AS avgRating
                from reviews r GROUP BY product_id) AS ratings 
            on ratings.product_id=pImg.product_id
        where p.id=${productId}
        `
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getReviewsByProductId= async(productId, limit, offset)=>{
    try {
        return await MySQLDatabase.query(
        `SELECT
            u.name,
            r.rating,
            r.content,
            DATE_FORMAT(r.created_at, '%y-%m-%d') postReviewDate,
            i.options
        from reviews r
        left join users u on u.id=r.user_id
        left join products_images pImg on pImg.product_id=r.product_id
        left join images i on i.id=pImg.image_id
        where r.product_id=${productId}
        LIMIT ${limit} OFFSET ${offset}
        `
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getReviewDistribution= async(productId)=>{
    try {
        return await MySQLDatabase.query(
        `SELECT
            r.rating,
            COUNT(r.rating) AS countRating
        FROM reviews r
        left join products_images pImg on pImg.product_id=r.product_id
        left join images i on i.id=pImg.image_id
        where r.product_id=${productId}
        GROUP BY rating ORDER BY rating ASC
        `
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const createCartList = async(
    userId,
    imageId1, quantity1,
    imageId2, quantity2,
    imageId3, quantity3,
    imageId4, quantity4
    ) => {
    try {

        const test = await MySQLDatabase.query(
        `INSERT INTO carts(user_id, image_id, quantity) 
            VALUES(${userId},${imageId1},${quantity1})
            ,(${userId},${imageId2},${quantity2})
            ,(${userId},${imageId3},${quantity3})
            ,(${userId},${imageId4},${quantity4})
        ;`);
        return test;

    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByRating,
    getProductsBySales,
    getDetailByProductId,
    getReviewsByProductId,
    getReviewDistribution,
    getOptionDataByProductId,
    createCartList
}
