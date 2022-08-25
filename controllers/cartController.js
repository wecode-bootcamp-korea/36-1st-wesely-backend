const cartServices = require('../services/cartServices');

const getCartListAll = async (req, res) => {
  const { user_id } = req.params;
  try{
    const getCartListAll = await cartServices.getCartListAll( user_id );
      res.status(200).json(getCartListAll);
  }
  catch(err) {
    console.log(err);
    return res.status(err.statuscode || 500).json({ message: err.message});
  }
}

const deleteCartProduct = async (req, res) => {
  const { user_id, image_id } = req.params;
  try {
    const deleteCartProduct = await cartServices.deleteCartProduct( user_id, image_id );
      res.status(204).json( )
  }
  catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json( {message: err.message} );
  }
}

const cartProductQuantityPlus = async (req, res) => {
  const { user_id, image_id } = req.params;
try{
  const countPlus = await cartServices.countPlus( user_id, image_id );
  res.status(200).json( {message: "PLUS SUCCESS"});
}
catch (err) {
  console.log(err);
  return res.status(err.statusCode || 500).json( {message: err.message} );
}
}

const cartProductQuantityMinus = async (req, res) => {
const { user_id, image_id } = req.params;
try{
const countMinus = await cartServices.countMinus( user_id, image_id );
res.status(200).json( {message: "MINUS SUCCESS"});
}
catch (err) {
console.log(err);
return res.status(err.statusCode || 500).json( {message: err.message} );
}
}

const orderInfo = async (req, res) => {
const { user_id, image_id } = req.params;
const { subscription_id, point } = req.body

try{
  const orderInfo = await cartServices.getOrderInfo( user_id, image_id, point, subscription_id );
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
