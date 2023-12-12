import React from 'react';
import Note from './Note';

function NoteList({ notes, selectNote, searchQuery, setSearchQuery }) {
    const filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="note-list">
            {/* search bar */}
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="search..." />
            <br></br>
            <br></br>
            {/* render filtered notes */}
            {filteredNotes.map((note) => (
                <Note key={note.id} note={note} selectNote={selectNote} />
            ))}
        </div>
    );
}

export default NoteList;