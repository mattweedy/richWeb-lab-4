import React, { useState } from "react";

function NoteForm({ addNote, editNote, deleteNote, currentNote, setCurrentNote }) {
    const[noteText, setNoteText] = useState("");
    const[noteColour, setNoteColour] = useState("red");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentNote) {
            editNote(noteText, noteColour);
        } else {
            addNote(noteText, noteColour);
        }
        setNoteText("");
        setCurrentNote(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* text input */}
            <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            />
            {/* colour select */}
            <select 
            value={noteColour} 
            onChange={(e) => setNoteColour(e.target.value)}
            >
                <option value={"red"}>Red</option>
                <option value={"green"}>Green</option>
                <option value={"blue"}>Blue</option>
            </select>
            {/* buttons */}
            <button type="submit">Add Note</button>
            <button type="submit" disabled={!currentNote}>Edit Note</button>
            <button type="button" onClick={deleteNote} disabled={!currentNote}>Delete Note</button>
        </form>
    )
}

export default NoteForm;