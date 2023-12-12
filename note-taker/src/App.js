import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/ToggleButton.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Weather from './components/Weather';

// extra functionality:
//       - button for swapping themes, including imported components
//       - users can search through notes
//       - search automatically filters notes
//       - displays message if no notes stored and removes search bar

const App = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState("")
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            document.body.className = newTheme;
            return newTheme
        });
    };

    const addNote = (noteText, noteColour) => {
        if (noteText.trim() !== "") {
            // give each note unique id with datetime
            const newNote = { id: Date.now(), text: noteText, color: noteColour };
            setNotes([...notes, newNote]);
        }
        setSearchQuery("");
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
        <div className={`App ${theme}`}>
            <header className="header">
                <h1>React Note Taker</h1>
                <label className="switch">
                    <input type="checkbox" onClick={toggleTheme} />
                    <span className="slider round"></span>
                </label>
            </header>
            <div className="grid">
                <div id="notes">
                    <h1 id="stored-notes-title">Stored notes</h1>
                    {(notes.length > 0) ? (
                        <NoteList notes={notes} selectNote={selectNote} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    ) : (
                        <div>Begin adding notes to display them here</div>
                    )}
                </div>

                <div id="notes-new">
                    <NoteForm addNote={addNote} editNote={editNote} deleteNote={deleteNote} currentNote={currentNote} setCurrentNote={setCurrentNote} />
                    <br></br>
                    <Weather theme={theme}></Weather>
                </div>

            </div>
        </div>
    );
}

export default App;