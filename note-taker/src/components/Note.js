import React from "react";
import '../stlyes/Note.css';

function Note({ note, selectNote, currentNote }) {
    console.log("current : ", currentNote)
    return (
        <div
            className="note"
            style={{ backgroundColor: note.color }}
            onClick={() => selectNote(note)}
        >
            {note.text}
        </div>
    );
}

export default Note;