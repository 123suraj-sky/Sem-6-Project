const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // similar to foreign key in sql
        ref: 'user'
        // this user is from User.js
    },

    title: {
        type: String,
        required: true
        // required will make mandatory fields
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
        /* default values set
         
        don't call Date.now() function here because we 
        want to run this when user enters the data */
    },
});

module.exports = mongoose.model('notes', NotesSchema);
// notes is the name of the model
