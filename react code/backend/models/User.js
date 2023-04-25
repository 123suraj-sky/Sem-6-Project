const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
        // required will make mandatory fields
    },
    email: {
        type: String,
        required: true,
        unique: true
        // unique will take only unique values
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
        /* default values set
         
        don't call Date.now() function here because we 
        want to run this when user enters the data */
    },
});

const User = mongoose.model('user', UserSchema);
// User.createIndexes();
// it will create unique indexes
module.exports = User;
// user is the name of the model
