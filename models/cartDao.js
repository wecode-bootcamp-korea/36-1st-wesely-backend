const { MySQLDatabase } = require("./database");

const errorFunc = (value, str) => {
  const error = new Error(str);
  error.statusCode = value;
  throw error;
}

const cartListAll = async ( userId ) => {
  try {
    return await MySQLDatabase.query(
      `
      SELECT distinct
      c.user_id,
      c.image_id,
      total.totalQuantity,
      i.options,
      i.image_url as image_url,
      p.price,
      p.name,
      u.point
      from images i
      left join carts c on c.image_id=i.id
      left join products_images pi on pi.image_id=i.id
      left join products p on p.id=pi.product_id
      left join users u on u.id = c.user_id
      left join
      (select
      image_id,
      SUM(quantity) AS totalQuantity
      from carts GROUP BY image_id) AS total
      ON total.image_id=i.id
      where c.user_id = ${userId}
      `,
    )
  }
  catch (err) {
    errorFunc(404, "INVALID_DATA_INPUT")
	}	
}

const deleteCartList = async ( userId, imageId ) => {
  try {
    return await MySQLDatabase.query(
      `
      DELETE FROM carts c WHERE c.user_id = ${ userId } AND c.image_id=${ imageId }
      `,
    )
  }
  catch(err) {
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const cartCheckUser = (userId) => {
  try {
    return MySQLDatabase.query(
      `
      SELECT EXISTS 
      (SELECT * FROM carts c 
        WHERE c.user_id = ${userId}); 
      
      `
    )
  } catch{
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const cartQuantityPlus = ( userId, imageId ) => {

  try {
    return MySQLDatabase.query(
      `
      update carts c
      set c.quantity = c.quantity + "1"
      where c.user_id=${userId} and c.image_id=${imageId} 
      LIMIT 1
      `
    )
  } catch{
		errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const cartQuantityMinus = ( userId, imageId ) => {
  try {
    return MySQLDatabase.query(
      `
      update carts c
      set c.quantity = c.quantity - 1
      where c.image_id=${imageId} and c.user_id=${userId}
      LIMIT 1
      `
    )
  } catch{
		errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const checkStock = ( imageId ) => {
  try {
    return MySQLDatabase.query(
      `
      SELECT distinct stock FROM products_information pi 
      LEFT JOIN products p on pi.id = p.product_information_id
      LEFT JOIN  images p2 on p2.id = p.id
      LEFT JOIN carts c on c.image_id = p2.id
      where c.image_id = ${ imageId }
      `
    )
  } catch {
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}


const checkQuantity = (imageId) => {
  return MySQLDatabase.query(
    `
    select sum(quantity) as quantity  
    from carts c WHERE image_id=${imageId}
    `
  )
}

const getOrderInfo = (userId) => {

  try {
    return MySQLDatabase.query(
      `
      INSERT INTO order_items(cart_id, image_id, quantity)
      (SELECT id, image_id, quantity from carts where user_id=${userId})
      `
  )}catch {
    errorFunc(404, "INVALID_DAT1A_INPUT")
  }
} 

const getInfo = (userId) => {
  try {
    return MySQLDatabase.query(
      `
      INSERT INTO orders(user_id, order_item_id)
      (SELECT c.user_id, oi.id
      from carts c
      left join order_items oi on c.id=oi.cart_id where user_id = ${userId})
      `,
  )}catch {
    errorFunc(404, "INVALID_DATA_INPUT")
  }
} 

const subscriptionUpdate = (userId, subscriptionId ) => {
  try {
    return MySQLDatabase.query(
      `
      update orders set subscription_id = ? where user_id = ${userId}
`, [subscriptionId]
  )}catch(err) {
    console.log(err)
    errorFunc(404, "INVALID_DATA_INPUT")
  }

}


const pointUpdate = ( userId, point) => {
  console.log(userId, point)
  try{
  return MySQLDatabase.query(
        `
        UPDATE users 
        SET point = ? 
        WHERE users.id = ?
      `, [point, userId]
  )}catch(err) {
    console.log(err)
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const deleteCart = (userId) => {
  try {
      return MySQLDatabase.query(
        `
      delete from carts where user_id = ${userId}; 
      `) 
  }catch(err) {
    console.log(err)
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}

module.exports = {
  cartListAll,
  deleteCartList,
  cartCheckUser,
  cartQuantityPlus,
  cartQuantityMinus,
  checkStock,
  checkQuantity,
  getOrderInfo,
  getInfo,
  deleteCart,
  pointUpdate,
  subscriptionUpdate,
}