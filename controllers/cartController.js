const cartServices = require('../services/cartServices');

const listAll = async (req, res) => {
  const { user_id } = req.params;
  try{
    const listAll = await cartServices.allList( user_id );
      res.status(200).json(JSON.parse(Object.values(listAll[0])));
  }
  catch(err) {
    console.log(err);
    return res.status(err.statuscode || 500).json({ message: err.message});
  }
}

const listDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const listDelete = await cartServices.deleteList( id );
      res.status(204).json( {message: "DELETE SUCCESS"})
  }
  catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json( {message: err.message} );
  }
}




module.exports = {
  listAll,
  listDelete,
}
