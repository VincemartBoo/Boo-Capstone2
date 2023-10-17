const Product = require("../models/Product");


// CONTROLLER: Create Product(Admin Only)
 module.exports.createProduct = (req, res) => {

    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    return newProduct.save().then((course, error) => {
        if(error){
            return res.send(false);
        } 
        else{
            return res.send(true);
        }
    }).catch(err => res.send(err))
};


// CONTROLLER: Retrieve All Products
module.exports.retrieveAllProducts = (req,res) => {
    return Product.find({}).then(result => {
        return res.send(result)
    });
};


// CONTROLLER: Retrieve All Active Products
module.exports.retrieveAllActive = (req, res) =>{
    return Product.find({isActive : true}).then(result => {
        return res.send(result)
    });
};


// CONTROLLER: Search Product by name
module.exports.searchProductsByName = async (req, res) => {
    try {
      const { productName } = req.body;
  
      // Use a regular expression to perform a case-insensitive search
      const products = await Product.find({
        name: { $regex: productName, $options: 'i' }
      });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


// CONTROLLER: Retrieve Single Product
module.exports.retrieveSingleProduct = (req, res) =>{
    return Product.findById(req.params.productId).then(result => {
        return res.send(result)
    });
};


// CONTROLLER: Update Product Information(Admin Only)
module.exports.updateProductInfo = (req, res) => {
    let updatedInfo = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };

    return Product.findByIdAndUpdate(req.params.productId, updatedInfo).then((course, error) => {
        if(error){
            return res.send(false)
        }
        else{
            return res.send(true)
        }
    })

};


// CONTROLLER: Archive Product(Admin Only)
module.exports.archiveProduct = (req, res) => {

    let updateStatus = {
        isActive: false
    }

    return Product.findByIdAndUpdate(req.params.productId, updateStatus)
    .then((product, error) => {
        if(error){
            return res.send(false)
        } 
        else{
            return res.send(true)
        }
    }).catch(err => res.send(err))
};


// CONTROLLER: Activate Product(Admin Only)
module.exports.activateProduct = (req, res) => {

    let updateStatus = {
        isActive: true
    }

    return Product.findByIdAndUpdate(req.params.productId, updateStatus)
    .then((product, error) => {
        if(error){
            return res.send(false)
        } 
        else{
            return res.send(true)
        }
    }).catch(err => res.send(err))
};