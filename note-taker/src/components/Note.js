import React from "react";

function Note({ note, selectNote }) {
    return (
        <div className="note" style={{backgroundColor: note.color}} onClick={() => selectNote(note)}>
            {note.text}
        </div>
    );
}

export default Note;