// [SECTION] Dependencies and Modules
const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require('bcrypt');
const auth = require("../auth");


/*
	[Main Goals]
*/

// CONTROLLER: User Registration
module.exports.registerUser = (reqBody) => {
	
	let newUser = new User({
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10)
	});

	return newUser.save().then((user, error) => {
		if(error){
			return false
		}else{
			return true
		}
	}).catch(err => err)
};


// CONTROLLER: User Authentication
module.exports.authentication = (req, res) => {
	return User.findOne({email : req.body.email}).then(result => {
		if(result == null){
			return false;
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)

			if(isPasswordCorrect){
				return res.send({access : auth.createAccessToken(result)})
			}
			else{
				return res.send(false);
			}
		}
	}).catch(err => res.send(err))
};


// CONTROLLER: Non-admin User Checkout(Create Order)
module.exports.userCheckout = async (req, res) => {
	console.log(req.user.id)
	console.log(req.body.productId)
	
	if(req.user.isAdmin){
		return res.send({message : "Action Forbidden!!!"});
	}

	const user_id = await User.findById(req.user.id);
	const product_id = await Product.findById(req.body.productId);
	
	
    const productPrice = product_id.price;
    const productName = product_id.name;
    const isAvailable = product_id.isActive
    const totalPrice = req.body.quantity * productPrice

    if(isAvailable !== true){
    	return res.send({notice : "Out of stock!"});
    }
    
    

	let isOrderUpdated = await User.findById(req.user.id).then(user => {


		let item = {
			productId: req.body.productId,
			productName: productName,
			quantity: req.body.quantity,
		}

		user.orderedProduct.push({products: [item], totalAmount: totalPrice});

		return user.save().then(user => true).catch(err => err.message)
	})
	if(isOrderUpdated !== true){
		return res.send({message : "isOrderUpdated"})
	}

	let isProductUpdated = await Product.findById(req.body.productId).then(product => {
		
		let Shopper = {
			userId : req.user.id,
		}

		product.userOrders.push(Shopper)

		return product.save().then(product => true).catch(err => err.message)
	})

	if(isProductUpdated !== true){
		return res.send({message : isProductUpdated})
	}
	if(isOrderUpdated && isProductUpdated){
		return res.send({message: "Orders successfully placed"})
	}
}


// CONTROLLER: Retrieve User Details
module.exports.retrieveUserDetails = (req, res) => {
	return User.findById(req.user.id).then(result => {
		result.password = "";
		return res.send(result);
	}).catch(err => res.send(err))
};



/*
	[Stretch Goals]
*/

// CONTROLLER: Set user as admin(Admin Only)
module.exports.updateUserAsAdmin = async (req, res) => {

    if(req.user.isAdmin !== true ) {
      return res.send({note : "Permission denied!" });
    }

    let {userId} = req.body;

    let updatedUser = await User.findByIdAndUpdate(userId, {isAdmin: true}).then((user, error) => {
		if(error){
			return res.send(false)
		}
		else{
			return res.send({message : "User updated as Admin Successfully"})
		}
	})
}


// CONTROLLER: Retrieve authenticated user's orders
module.exports.retrieveUserOrder = async (req, res) => {
	// console.log(req.user.id) 
	// console.log(req.body.courseId)
	
	if(req.user.isAdmin){
		return res.send({message : "Action Forbidden")
	}

    let isUserOrder = await User.findById(req.user.id).then(result => {
        const order = result.orderedProduct
        return res.send(order);
    })
        .catch(err => res.send(err))

    if(isUserOrder !== true){
	 	return res.send({message : "User not found"})
	}
}
