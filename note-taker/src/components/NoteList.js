import React from 'react';
import Note from './Note';

function NoteList({ notes, selectNote }) {
    return (
        <div className="note-list">
            {notes.map((note) => (
                <Note key={note.id} note={note} selectNote={selectNote} />
            ))}
        </div>
    );
}

export default NoteList;