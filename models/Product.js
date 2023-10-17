// [SECTION] Dependencies and Modules
const mongoose = require("mongoose");

// [SECTION] Schema/Blueprint
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Product Name is required"]
	},
	description: {
		type: String,
		required: [true, "Product description is required"]
	},
	price: {
		type: Number,
		required: [true, "Price is required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		dafault: new Date
	},
	userOrders: [
		{
			userId: {
				type: mongoose.Schema.ObjectId,
				ref: 'User'
			},
			orderId: {
				type: String,
			}
		}
	]
});

module.exports = mongoose.model("Product", productSchema);