import React, { useEffect, useState } from 'react';
import './stlyes/App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Weather from './components/Weather';

// extra functionality:
//       - swap css file to darkmode depending on time
//       - users can search to filter notes

const App = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);

    const addNote = (noteText, noteColour) => {
        if (noteText.trim() !== "") {
            // give each note unique id with datetime
            const newNote = { id: Date.now(), text: noteText, color: noteColour };
            setNotes([...notes, newNote]);
        }
    };

    const editNote = (noteText, noteColour) => {
        if (currentNote) { // if theres a note selected
            const editedText = window.prompt("edit note text/colour", currentNote.text); // prompt for new text
            if (editedText !== null) { // if the text isnt empty
                //update the note in the notes array
                setNotes(notes.map(note => note === currentNote ? { ...note, text: editedText, color: noteColour } : note));
            }
        }
    };

    const deleteNote = () => {
        if (currentNote) { // if there is a note selected
            if (window.confirm("delete selected note?")) { // prompt to delete
                setNotes(notes.filter(note => note !== currentNote)); // remove the note from the notes array
                setCurrentNote(null); // reset note selection
            }
        }
    };

    const selectNote = (note) => {
        console.log(note);
        setCurrentNote(note);
    }

    return (
        
        <div>
            <header>
                <h1>React Note Taker</h1>
            </header>
            <div className="grid">
                <div id="notes">
                    <h1 id="stored-notes-title">Stored notes</h1>
                    <NoteList notes={notes} selectNote={selectNote} />
                </div>

                <div id="notes-new">
                    <NoteForm addNote={addNote} editNote={editNote} deleteNote={deleteNote} currentNote={currentNote} setCurrentNote={setCurrentNote} />

                    <br></br>

                    <Weather></Weather>
                </div>

            </div>
        </div>
    );
}

export default App;