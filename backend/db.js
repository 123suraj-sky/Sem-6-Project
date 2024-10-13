const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook';
// mongoURI is a connection string to connect to the database
// if deploy on a server, change the connection string to the server's address

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to MongoDB");
    });
}

module.exports = connectToMongo;