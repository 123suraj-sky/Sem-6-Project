const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const port = 80;

// case of mongoose connection error
main().catch(err => console.log(err));

// case of mongoose connection success
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
    // database name is "contactDance"

    //* creating schema
    const contactSchema = new mongoose.Schema({
        // contents of schema
        name: String,
        phone: String,
        email: String,
        address: String,
        desc: String
    });

    //* converting schema to model i.e. compiling
    const Contact = mongoose.model('Contact', contactSchema);

    app.post('/contact', (req, res) => {
        var myData = new Contact(req.body);
        myData.save().then(() => {
            res.send("This item has been saved to the database");
        }).catch((err) => {
            res.status(400).send("Item was not saved to the database", err);
        });
    
        // res.status(200).render('contact.pug');
    });
}

//* Express Specific Stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//* Pug Specific Stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//* Endpoints
app.get('/', (req, res) => {
    const params = {};
    // res.status(200).render('index.pug', params);
    // after we create home.pug using template we will serve that
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    // res.status(200).render('index.pug', params);
    // after we create home.pug using template we will serve that
    res.status(200).render('contact.pug', params);
});



//* Start The Server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});