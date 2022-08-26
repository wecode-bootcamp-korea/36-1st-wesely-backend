const cartServices = require('../services/cartServices');

const getCartListAll = async (req, res) => {
  const userId = req.userId.id;
  try{
    const getCartListAll = await cartServices.getCartListAll( userId );
      res.status(200).json(getCartListAll);
  }
  catch(err) {
    console.log(err);
    return res.status(err.statuscode || 500).json({ message: err.message});
  }
}

const deleteCartProduct = async (req, res) => {
  const userId = req.userId.id;
  const {  imageId } = req.params;
  console.log(userId, imageId);
  try {
    const deleteCartProduct = await cartServices.deleteCartProduct(  userId, imageId );
      res.status(204).json( )
  }
  catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json( {message: err.message} );
  }
}

const cartProductQuantityPlus = async (req, res) => {
  const userId = req.userId.id;
  const { imageId } = req.params;
try{
  const countPlus = await cartServices.countPlus(  userId, imageId );
  res.status(200).json( {message: "PLUS SUCCESS"});
}
catch (err) {
  console.log(err);
  return res.status(err.statusCode || 500).json( {message: err.message} );
}
}

const cartProductQuantityMinus = async (req, res) => {
  const userId = req.userId.id;
const {  imageId } = req.params;
console.log(userId, imageId);
try{
const countMinus = await cartServices.countMinus(  userId, imageId );
res.status(200).json( {message: "MINUS SUCCESS"});
}
catch (err) {
console.log(err);
return res.status(err.statusCode || 500).json( {message: err.message} );
}
}

const orderInfo = async (req, res) => {
  const userId = req.userId.id;
const {  imageId } = req.params;
const { subscriptionId, point } = req.body
console.log( 'Id', userId, 'option', imageId,  'point', point, 'subs', subscriptionId, )
try{
  const orderInfo = await cartServices.getOrderInfo(  imageId, point, subscriptionId );
  res.status(200).json( {message: "SUCCESS"});
} catch(err) {
  console.log(err);
  return res.status(err.statusCode || 500).json( {message: err.message} );
}
}

module.exports = {
  getCartListAll,
  deleteCartProduct,
  cartProductQuantityPlus,
  cartProductQuantityMinus,
  orderInfo,
}
