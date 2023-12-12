import React, { useState } from "react";

function NoteForm({ addNote, editNote, deleteNote, currentNote }) {
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
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* text input */}
            <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            />
            {/* colour select */}
            <select value={noteColour} onChange={(e) => setNoteColour(e.target.value)}>
                <option value={"red"}>Red</option>
                <option value={"green"}>Green</option>
                <option value={"blue"}>Blue</option>
            </select>
            {/* buttons */}
            <button type="submit">{currentNote ? "Edit Note" : "Add Note"}</button>
            {currentNote && <button type="button" onClick={deleteNote}>Delete Note</button>}
        </form>
    )
}

export default NoteForm;