//[Section] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// allows access to routes defined within the application
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

//[Section]Environment Setup
const port = 4004;

// [Section] Server Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// [SECTION] Backend Routes
// http://localhost:4000/users
app.use("/b4/users", userRoutes);
// http://localhost:4000/products
app.use("/b4/products", productRoutes);

// [Section] Database Connection
mongoose.connect("mongodb+srv://boovincemart:admin12345@cluster0.2zajqvy.mongodb.net/E-commerce_API?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useUnifiedTopology: true
})

// prompts a message in the terminal once the connection is "open"
mongoose.connection.once('open', () => console.log('Now Conneted to MongoDB Atlas'));

// [SECTION] Server Gateway Response
if(require.main === module){
	app.listen(process.env.PORT || port, () =>{
		console.log(`API is now online on port ${process.env.PORT || port}`)
	})
}

module.exports = {app, mongoose};