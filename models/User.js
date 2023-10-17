//[SECTION] Modules and Dependencies
const mongoose = require("mongoose");

//[SECTION] Schema/Blueprint
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orderedProduct: [
        {
            products: [
                {
                    productId: {
                        type: mongoose.Schema.ObjectId,
                        ref: 'Product'
                    },
                    productName: {
                        type: String,
                        
                    },
                    quantity: {
                        type: Number,
                        min: 1
                    }
                }
            ],
            totalAmount: {
                type: Number
            },
            purchasedOn: { 
                type: Date,
                default: new Date()
            }
        }
    ]
});

//[SECTION] Model
module.exports = mongoose.model("User", userSchema);