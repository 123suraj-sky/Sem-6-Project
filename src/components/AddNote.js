// rafce -> shortcut used
import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import './css/Home.css'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleCreateNote = (e) => {
        e.preventDefault(); // so that page will not reload
        addNote(note.title, note.description, note.tag);

        // once note is added, clear the form
        setNote({ title: "", description: "", tag: "" });

        props.showAlert("Note Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        // ...note means append or update the previous note by the second parameter given to it
    }

    return (
        <div className="container my-3 title">
            <h2 className='d-flex justify-content-center'>Ask a Query</h2>

            {/* form to show notes */}
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={note.title} type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input value={note.description} type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input value={note.tag} type="text" className="form-control" id="tag" name='tag' onChange={onChange} required />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleCreateNote}>Ask Query</button>
            </form>
        </div>
    )
}

export default AddNote
