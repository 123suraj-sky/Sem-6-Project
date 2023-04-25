// import { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    /*
    * notes
    const s1 = {
        name: "Shubham",
        class: "12",
    };

    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({ name: "Batman", class: "15" });
        }, 1000);
    }

    return (
        <noteContext.Provider value={{ state, update }}>
            {props.children}
        </noteContext.Provider>
    );
    */

    const host = "http://localhost:5000";

    // const notesInitial = [
    //     {
    //         "_id": "63e7b40a0a3bd2baf8acb5151",
    //         "user": "63e50a6e2bb0dba0a630f4a1",
    //         "title": "this is a title1",
    //         "description": "this is my description1",
    //         "tag": "personal",
    //         "date": "2023-02-11T15:28:10.754Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63e7b40a0a3bd2baf8acb5152",
    //         "user": "63e50a6e2bb0dba0a630f4a1",
    //         "title": "this is a title1",
    //         "description": "this is my description1",
    //         "tag": "personal",
    //         "date": "2023-02-11T15:28:10.754Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63e7b40a0a3bd2baf8acb5153",
    //         "user": "63e50a6e2bb0dba0a630f4a1",
    //         "title": "this is a title1",
    //         "description": "this is my description1",
    //         "tag": "personal",
    //         "date": "2023-02-11T15:28:10.754Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63e7b40a0a3bd2baf8acb5154",
    //         "user": "63e50a6e2bb0dba0a630f4a1",
    //         "title": "this is a title1",
    //         "description": "this is my description1",
    //         "tag": "personal",
    //         "date": "2023-02-11T15:28:10.754Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63e7b40a0a3bd2baf8acb5155",
    //         "user": "63e50a6e2bb0dba0a630f4a1",
    //         "title": "this is a title1",
    //         "description": "this is my description1",
    //         "tag": "personal",
    //         "date": "2023-02-11T15:28:10.754Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63e7b40a0a3bd2baf8acb5156",
    //         "user": "63e50a6e2bb0dba0a630f4a1",
    //         "title": "this is a title1",
    //         "description": "this is my description1",
    //         "tag": "personal",
    //         "date": "2023-02-11T15:28:10.754Z",
    //         "__v": 0
    //     }
    // ]

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial)

    //* Add notes
    const addNote = async (title, description, tag) => {
        // api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        // console.log(json);



        // console.log("adding a new note");
        // const note = {
        //     "_id": "63e7b40a0a3bd2baf8acb51536",
        //     "user": "63e50a6e2bb0dba0a630f4a1",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2023-02-11T15:28:10.754Z",
        //     "__v": 0
        // };
        // concat return an array whereas push updates an array
    }

    //* Get all notes
    const getNotes = async () => {
        // api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }

    //* Delete notes
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);


        // console.log("Deleting the note with id", id);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    }

    //* Edit notes
    const editNote = async (id, title, description, tag) => {
        // api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ id, title, description, tag }),
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // edit in client side
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;