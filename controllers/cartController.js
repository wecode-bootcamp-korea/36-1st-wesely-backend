const cartServices = require('../services/cartServices');

const getCartListAll = async (req, res) => {
  const { user_id } = req.params;
  try{
    const getCartListAll = await cartServices.getCartListAll( user_id );
      res.status(200).json(JSON.parse(Object.values(getCartListAll[0])));
  }
  catch(err) {
    console.log(err);
    return res.status(err.statuscode || 500).json({ message: err.message});
  }
}

const deleteCartProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCartProduct = await cartServices.deleteCartProduct( id );
      res.status(204).json( )
  }
  catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json( {message: err.message} );
  }
}

module.exports = {
  getCartListAll,
  deleteCartProduct,
}
