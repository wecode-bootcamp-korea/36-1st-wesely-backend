const {appDataSource} =require("./dataSource")

const getAllProducts = async(offset, limit) =>{
    try{
        return await appDataSource.query(`
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

const getProductsByCategory = async(categoryId, offset, limit)=>{
    try{
        return await appDataSource.query(`
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

const getOptionDataByProductId= async(productId)=>{
    try {
        return await appDataSource.query(
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
        return await appDataSource.query(
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

const getReviewsByProductId= async(productId)=>{
    try {
        return await appDataSource.query(
        `SELECT
            u.name,
            r.rating,
            r.content,
            r.created_at postReviewDate,
            i.options
        from reviews r
        left join users u on u.id=r.user_id
        left join products_images pImg on pImg.product_id=r.product_id
        left join images i on i.id=pImg.image_id
        where r.product_id=${productId}
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
        return await appDataSource.query(
        `SELECT
            r.rating,
            COUNT(r.rating) AS countRating
        FROM reviews r
        left join products_images pImg on pImg.product_id=r.product_id
        left join images i on i.id=pImg.image_id
        where r.product_id=${productId}
        GROUP BY rating
        `
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getOptionDataByProductId,
    getDetailByProductId,
    getReviewsByProductId,
    getReviewDistribution
}

