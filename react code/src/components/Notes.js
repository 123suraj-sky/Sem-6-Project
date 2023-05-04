// rafce -> shortcut used
import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// useRef is used to give reference to any element
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import './css/Home.css'

const Notes = (props) => {
    const ref = useRef(null);
    const refClose = useRef(null);
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    let navigate = useNavigate();

    useEffect(() => {
        // if user have account then login otherwise redirect to login page
        if (localStorage.getItem("token")) {
            getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleCreateNote = (e) => {
        // console.log("Updating the note", note);
        // e.preventDefault(); // so that page will not reload
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();

        props.showAlert("Note Updated Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        // ...note means append or update the previous note by the second parameter given to it
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            {/* Modals */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form to show notes */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name='etitle' onChange={onChange} value={note.etitle} minLength={5} required />
                                    {/* etitle -> edit title */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleCreateNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2 className='title'>Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
