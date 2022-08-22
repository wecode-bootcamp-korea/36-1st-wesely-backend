const { Database } = require("./Database");

const errorFunc = (value, str) => {
  const error = new Error(str);
  error.statusCode = value;
  throw error;
}

const cartListAll = async ( user_id ) => {
  try {
    return await Database.query(
      `
      SELECT carts 
      FROM ( SELECT json_object
        ('cartList', json_arrayagg(json_object
          (
          'id', c.id, 
          'product_id',
          c.product_id,
          'quantity',
          c.quantity,
          'price',c.total_price, 
          'name', p.name,
          'option',c.options, 'img_url', i.image_url) ) ) carts 
          FROM users u 
          INNER JOIN carts c  on u.id = c.user_id 
          INNER JOIN products p on c.product_id=p.id
          INNER JOIN products_images pi on p.id = pi.product_id
          INNER JOIN images i on pi.image_id = i.id
          WHERE u.id = ${user_id} AND c.options = i.options AND c.product_id = i.product_id GROUP BY u.id) sub;
      `,
    )
  }
  catch (err) {
		errorFunc(404, "INVALID_DATA_INPUT")
	}	
}

const cartListDelete = async ( id ) => {
  try {
    return await Database.query(
      `
      DELETE FROM carts c WHERE c.id = ${ id }
      `,
    )
  }
  catch(err) {
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const cartCheckUser = (user_id) => {
  try {
    return Database.query(
      `
      SELECT EXISTS 
      (SELECT * FROM carts c 
        WHERE c.user_id = ${user_id}); 
      
      `
    )
  } catch{
		errorFunc(404, "INVALID_DATA_INPUT")
  }
}

module.exports = {
  cartListAll,
  cartListDelete,
  cartCheckUser,
}