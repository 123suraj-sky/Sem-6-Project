//* Middleware --> a function which called everytime when we hit this route

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'thisisasecretkeyforjsonwebtoken@iambatman';



const fetchUser = (req, res, next) => {
    // next will call the next middleware

    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    // token come from the header
    // auth-token is the key of the token
    // auth-token is the name of the header
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}


module.exports = fetchUser;