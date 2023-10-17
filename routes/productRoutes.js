// [SECTION] Dependencies and Modules
const express = require("express");
const productController = require("../controllers/productController");
const auth = require("../auth")
const {verify, verifyAdmin} = auth;


// [SECTION] Routing Component
const router = express.Router();


// ROUTE: Create Product(Admin Only)
router.post("/", verify, verifyAdmin, productController.createProduct);


// ROUTE: Retrieve All Products
router.get("/allProducts", productController.retrieveAllProducts);


// ROUTE: Retrieve All Active Products
router.get("/allActive", productController.retrieveAllActive);


//[SECTION] Route for Search Product by Name
router.post('/searchByName', productController.searchProductsByName);	


// ROUTE: Retrieve Single Product
router.get("/:productId", productController.retrieveSingleProduct);


// ROUTE: Update Product Information(Admin Only)
router.put("/:productId", verify, verifyAdmin, productController.updateProductInfo);


// ROUTE: Archive Product(Admin Only)
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);


// ROUTE: Activate Product(Admin Only)
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);


module.exports = router;