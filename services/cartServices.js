const cartDao = require('../models/cartDao')


const allList = async ( user_id ) => {

  const checkId = await cartDao.cartCheckUser( user_id )
  const cartIdCheck = await Number(Object.values(checkId[0])[0])

  if ( cartIdCheck !== 1 ) {
    const error = new Error( 'Cart empty' )
    error.statusCode = 409;
    throw error
  }

  const listAll = await cartDao.cartListAll( user_id );
  console.log(listAll);
  return listAll;
};

const deleteList = async ( id ) => {
  const listDelete = await cartDao.cartListDelete( id );
  return listDelete;
}


module.exports = {
  allList,
  deleteList,
}