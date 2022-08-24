const cartDao = require('../models/cartDao')


const getCartListAll = async ( user_id ) => {

  const checkId = await cartDao.cartCheckUser( user_id )
  const cartIdCheck = await Number(Object.values(checkId[0])[0])

  const productEnum = Object.freeze({
    Exists: 1,
    notExists: 0
  });

  if ( cartIdCheck == productEnum.notExists ) {
    const error = new Error( 'Cart empty' )
    error.statusCode = 409;
    throw error
  }

  const listAll = await cartDao.cartListAll( user_id );
  console.log(listAll);
  return listAll;
};

const deleteCartProduct = async ( id ) => {
  const listDelete = await cartDao.deleteCartList( id );
  return listDelete;
}


module.exports = {
  getCartListAll,
  deleteCartProduct,
}