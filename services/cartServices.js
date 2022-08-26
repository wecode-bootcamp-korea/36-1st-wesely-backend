const cartDao = require('../models/cartDao')


const getCartListAll = async ( userId ) => {

  const checkId = await cartDao.cartCheckUser( userId )
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

  const listAll = await cartDao.cartListAll( userId );
  console.log(listAll);
  return listAll;
};

const deleteCartProduct = async ( userId, imageId ) => {
  const listDelete = await cartDao.deleteCartList( userId, imageId );
  return listDelete;
}

const countPlus = async ( userId, imageId ) => {
  console.log(userId, imageId)
  const checkProductStock = await cartDao.checkStock( imageId );
  const productStock = await Number(Object.values(checkProductStock[0])[0]);
  console.log(productStock)
  const checkQuantity = await cartDao.checkQuantity( imageId );
  const cartQuantity = await Number(Object.values(checkQuantity[0])[0]);
  console.log(cartQuantity)
  const limit = (productStock < cartQuantity);

  if (limit == true ) {
    const error = new Error( 'MAXIMUM STOCK OVER' )
    error.statusCode = 409;
    throw error
  }
  const count = await cartDao.cartQuantityPlus( userId, imageId );
  return count;
}

const countMinus = async ( userId, imageId ) => {
  const count = await cartDao.cartQuantityMinus( userId, imageId );
  return count;
}

const getOrderInfo = async (  userId, imageId,  point, subscriptionId, ) => {

  const orderInfo = await cartDao.getOrderInfo( userId );
  const order = await cartDao.getInfo(  userId, imageId );
 
  const subscription = await cartDao.subscriptionUpdate( userId, imageId, subscriptionId, point);
  const pointUpdate = await cartDao.pointUpdate(  userId, point);
  return pointUpdate;
}


module.exports = {
  getCartListAll,
  deleteCartProduct,
  countPlus,
  countMinus,
  getOrderInfo,
}