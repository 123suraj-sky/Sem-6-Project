const express = require('express');
const router = express.Router();
// Router() is in express
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



//* Route 1: Get all the notes of a user using : GET "/api/notes/fetchallnotes". login requried
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    // fetchUser is a middleware

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//* Route 2: Fetch all the notes of a user using : GET "/api/notes/fetchallnotes". login requried
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // if there are any errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //* if user entered valid note
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        //* saving note
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//* Route 3: Update the notes of a user using : PUT "/api/notes/updatenote". login requried
// we also have to give the id of note which we want to update
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //* create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //* find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        // here id is that id which is given in put request i.e. user who wants to update note

        // if note not found
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //* checking if the same user is updating its note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //* if note exits
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // new: true means if note not exist, then new note will be created

        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//* Route 4: Delete the notes of a user using : Delete "/api/notes/deletenote". login requried
// we also have to give the id of note which we want to update
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //* find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        // here id is that id which is given in put request i.e. user who wants to update note

        // if note not found
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //* checking if the same user is deleting its note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //* if note exits
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note deleted successfully", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router;