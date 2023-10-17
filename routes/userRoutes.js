// [SECTION] Dependencies and Modules
const express = require("express");
const userController = require("../controllers/userController");
const auth = require('../auth');
const {verify, verifyAdmin} = auth;


// [SECTION] Routing Component
const router = express.Router();



/*
	[Main Goals]
*/

// ROUTE: User Registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => {
		res.send(resultFromController)
	});
});

// ROUTE: User Authentication
router.post("/login", userController.authentication);


// ROUTE: Non-admin User Checkout(Create Order)
router.post("/checkout", verify, userController.userCheckout);


// ROUTE: Retrieve User Details
router.get("/userDetails", verify, userController.retrieveUserDetails);



/*
	[Stretch Goals]
*/ 

// ROUTE: Set user as admin(Admin Only)
router.put("/updateAdmin", verify, verifyAdmin, userController.updateUserAsAdmin);


// ROUTE: Retrieve authenticated user's orders
router.get("/userOrder", verify, userController.retrieveUserOrder);

module.exports = router;