const jwt = require("jsonwebtoken");
// User defined string data that will used to create our JSON web tokens
// Used in the algorithm for encrypting our data which makes it difficult to decode the information without the defined secret code
const secret = "CourseBookingAPI";

// [SECTION] JSON Web Tokens
/*
	-JSON Web token or JWT is a way of securely passing  information from the server to the frontend application ot to other parts of the server
	-ionformation is kept secure through the use of the secret code
	- only the system taht knows the secret code that can decode the encrypted information

	-imagine JWT as a gift wrapping service that secures the gift with a lock
	-only the person who know the secret code can open the lock
	-and if the wrapper has benn tampered with, JWT also recoghnizes this and disregareds the gift
	-this ensures that the data is secure from the sender to the receiver
*/

// Token Creation
module.exports.createAccessToken = (user) => {
	// the data will be received from the registration from
	// when the user logs in, a token will be created with user's information
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};
	// generates a JSON web token using jwt's sign method
	// generate sthe token using the form data and the secret code with no additional options provided
	return jwt.sign(data, secret, {});
}

// [SECTION] Token Verification
/*
	Analogy
		-receive the gift and open the lock to verify if the sender is legitimate and the gift was not tampered
*/
module.exports.verify = (req, res, next) => {
	// the token is retrieved  from the request header
	// this can be provided in postman
	console.log(req.headers.authorization)

	// req.headers.authorization contains sensitive data
	let token = req.headers.authorization;

	// if we are not passing token in our request authorization or in our postman authorization, then here in our API, req.headers.authorization will be undefined

	// this if statement will check if the token variable contains undefinned or a proper jwt
	if(typeof token === "undefined"){
		return res.send({auth: "Failed. No Token"});
	}
	else{
		console.log(token);

		token = token.slice(7, token.length);
		console.log(token);
		jwt.verify(token, secret, function(err, decodedToken) {
			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				});
			}
			else{
				console.log(decodedToken);
				req.user = decodedToken

				next();

			}
		})
	}
}

module.exports.verifyAdmin = (req, res, next) => {
	if(req.user.isAdmin){
		next();
	}
	else{
		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}