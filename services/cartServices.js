const cartDao = require('../models/cartDao')


const getCartListAll = async ( user_id ) => {

  const checkId = await cartDao.cartCheckUser( user_id )
  const cartIdCheck = await Number(Object.values(checkId[0])[0])

  const cartEnum = Object.freeze({
    Exists: 1,
    notExists: 0
  });

  if ( cartIdCheck == cartEnum.notExists ) {
    const error = new Error( 'Cart empty' )
    error.statusCode = 409;
    throw error
  }

  const listAll = await cartDao.cartListAll( user_id );
  console.log(listAll);
  return listAll;
};

const deleteCartProduct = async ( user_id, image_id ) => {
  const listDelete = await cartDao.deleteCartList( user_id, image_id );
  return listDelete;
}

const countPlus = async ( user_id, image_id ) => {
  const checkProductStock = await cartDao.checkStock( image_id );
  const productStock = await Number(Object.values(checkProductStock[0])[0]);
  console.log(productStock)
  const checkQuantity = await cartDao.checkQuantity( image_id );
  const cartQuantity = await Number(Object.values(checkQuantity[0])[0]);
  console.log(cartQuantity)
  const limit = (productStock < cartQuantity);

  if (limit == true ) {
    const error = new Error( 'MAXIMUM STOCK OVER' )
    error.statusCode = 409;
    throw error
  }
  const count = await cartDao.cartQuantityPlus( user_id, image_id );
  return count;
}

const countMinus = async ( user_id, image_id ) => {
  const count = await cartDao.cartQuantityMinus( user_id, image_id );
  return count;
}

const getOrderInfo = async (  user_id, image_id,  point, subscription_id, ) => {

  const orderInfo = await cartDao.getOrderInfo( user_id );
  const order = await cartDao.getInfo(  user_id, image_id );
  const subscription = await cartDao.subscriptionUpdate( user_id, image_id, subscription_id, point);
  const pointUpdate = await cartDao.pointUpdate(  user_id, point);
  return pointUpdate;
}


module.exports = {
  getCartListAll,
  deleteCartProduct,
  countPlus,
  countMinus,
  getOrderInfo,
}