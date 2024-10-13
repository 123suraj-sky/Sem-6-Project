const express = require('express');
const router = express.Router();
// Router() is in express
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'thisisasecretkeyforjsonwebtoken@iambatman';
// this is the secret key for jsonwebtoken
// used to sign web token
// don't show this key to anyone
// this key should be in .env file
// this key can be any string

//* Route 1: create a user using : POST "/api/auth/createuesr". No login requried
router.post('/createuser', [
    // body('name').isLength({ min: 3 }),
    // second parameter is the error message -> not compulsory
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    // body('email').isEmail(),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
    // min will check for minimum length of the string
], async (req, res) => {
    // obj = {
    //     a: "this",
    //     number: 34
    // }
    // res.json(obj);

    //* saving data using rapid api
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    let success = false;

    //* saving data using express-validator
    // if there are any errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // check if user with same email exist already
        let user = await User.findOne({ email: req.body.email });
        // since User is a promise so we have to await until it is resolved
        if (user) {
            return res.status(400).json({ success, error: "Sorry!! A user with same email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        // genSalt will generate a salt of 10 rounds
        const securePassword = await bcrypt.hash(req.body.password, salt);
        // while using bcrypt, it don't allow to save salt in the database

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // sign takes first argument as data and second argument as secret key
        // data can be anything like user id, name, email, etc
        // secret key is the key which is used to sign the token
        // this will return a token
        // sign is the built in function of jsonwebtoken
        // sign is a sync method, so we don't have to use await
        // console.log(jwtData);
        //! JWT_SECRET also used to check if there is any change in the token using jwt.verify

        // if we send 'id' of data from monogoDB, then it will be fastest

        // res.json(user);
        success = true;
        res.json({ success, authToken });

    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    // No need to user .then and .catch when using async await
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: "Please enter a unique value for email", message: err.message})});
    // err.message will give the error message
});


//* Route 2: Authenticate a user using : POST "/api/auth/login". No login requried
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
    // exists function checks if the field is empty or not
], async (req, res) => {
    let success = false;

    // if there are any errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // destructuring from body to get email and password
    const { email, password } = req.body;

    try {
        // find user in database
        let user = await User.findOne({ email });
        // if user not exists
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        // compare password
        const passwordCompare = await bcrypt.compare(password, user.password);
        /* compare takes two arguments, first is the 
        password which we want to compare and second is 
        the password which we want to compare with 
        which is stored in database */

        // if password doesn't match
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        // if password matches
        // payLoad is user data
        const payLoad = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payLoad, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});


//* Route 3: Get lodded in user details using : POST "/api/auth/getuser". login requried
// so we have to send token
router.post('/getuser', fetchUser, async (req, res) => {
    /* we don't write authenticaion here as if we do that 
    we have to write it everywhere where we want to get 
    user details 
    
    here fetchUser is a middleware*/
    try {
        userId = req.user.id;

        // req.user.id is the id of the user which is sent by the middleware
        const user = await User.findById(req.user.id).select("-password");
        // select("-password") will select everything except password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;