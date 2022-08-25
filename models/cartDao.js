const { MySQLDatabase } = require("./Database");

const errorFunc = (value, str) => {
  const error = new Error(str);
  error.statusCode = value;
  throw error;
}

const cartListAll = async ( user_id ) => {
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
      p.name
      from images i
      left join carts c on c.image_id=i.id
      left join products_images pi on pi.image_id=i.id
      left join products p on p.id=pi.product_id
      left join
      (select
      image_id,
      SUM(quantity) AS totalQuantity
      from carts GROUP BY image_id) AS total
      ON total.image_id=i.id
      where c.user_id = ${user_id}
      `,
    )
  }
  catch (err) {
    errorFunc(404, "INVALID_DATA_INPUT")
	}	
}

const deleteCartList = async ( user_id, image_id ) => {
  try {
    return await MySQLDatabase.query(
      `
      DELETE FROM carts c WHERE c.user_id = ${ user_id } AND c.image_id=${ image_id }
      `,
    )
  }
  catch(err) {
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const cartCheckUser = (user_id) => {
  try {
    return MySQLDatabase.query(
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

const cartQuantityPlus = ( user_id, image_id ) => {
  console.log(user_id,image_id)
  try {
    return MySQLDatabase.query(
      `
      update carts c
      set c.quantity = c.quantity + "1"
      where c.user_id=${user_id} and c.image_id=${image_id} 
      LIMIT 1
      `
    )
  } catch{
		errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const cartQuantityMinus = ( user_id, image_id ) => {
  try {
    return MySQLDatabase.query(
      `
      update carts c
      set c.quantity = c.quantity - 1
      where c.image_id=${image_id} and c.user_id=${user_id}
      LIMIT 1
      `
    )
  } catch{
		errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const checkStock = ( image_id ) => {
  try {
    return MySQLDatabase.query(
      `
      SELECT distinct stock FROM products_information pi 
      LEFT JOIN products p on pi.id = p.product_information_id
      LEFT JOIN  images p2 on p2.id = p.id
      LEFT JOIN carts c on c.image_id = p2.id
      where c.image_id = ${ image_id }
      `
    )
  } catch {
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}


const checkQuantity = (image_id) => {
  return MySQLDatabase.query(
    `
    select sum(quantity) as quantity  
    from carts c WHERE image_id=${image_id}
    `
  )
}

const getOrderInfo = (user_id) => {

  try {
    return MySQLDatabase.query(
      `
      INSERT INTO order_items(cart_id, image_id, quantity)
      (SELECT id, image_id, quantity from carts where user_id=${user_id})
      `
  )}catch {
    errorFunc(404, "INVALID_DAT1A_INPUT")
  }
} 

const getInfo = (user_id) => {
  try {
    return MySQLDatabase.query(
      `
      INSERT INTO orders(user_id, order_item_id)
      (SELECT c.user_id, oi.id
      from carts c
      left join order_items oi on c.id=oi.cart_id where user_id = ${user_id})
      `,
  )}catch {
    errorFunc(404, "INVALID_DATA_INPUT")
  }
} 

const subscriptionUpdate = (subscription_id, user_id) => {
  try {
    return MySQLDatabase.query(
      `
      update orders set subscription_id = ? where user_id = ${user_id}
`, [subscription_id]
  )}catch(err) {
    console.log(err)
    errorFunc(404, "INVALID_DATA_INPUT")
  }

}


const pointUpdate = ( user_id, point) => {
  console.log(user_id, point)
  try{
  return MySQLDatabase.query(
        `
        UPDATE users 
        SET point = ? 
        WHERE users.id = ?
      `, [point, user_id]
  )}catch(err) {
    console.log(err)
    errorFunc(404, "INVALID_DATA_INPUT")
  }
}

const deleteCart = (user_id) => {
  try {
      return MySQLDatabase.query(
        `
      delete from carts where user_id = ${user_id}; 
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