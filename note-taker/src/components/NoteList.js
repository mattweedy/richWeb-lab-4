import React, { useState } from 'react';
import Note from './Note';

function NoteList({ notes, selectNote, searchQuery, setSearchQuery }) {
    const [isOldestFirst, setIsOldestFirst] = useState(true);

    const filteredNotes = notes
        .filter(note => note.text.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => isOldestFirst ? a.id - b.id : b.id - a.id); // compare id age

    const toggleSortOrder = () => {
        setIsOldestFirst(!isOldestFirst);
    };

    return (
        <div className="note-list">
            {/* search bar */}
            <div className='note-list-features'>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="search..." />
                <button onClick={toggleSortOrder}>
                    {isOldestFirst ? 'Sort by Newest' : 'Sort by Oldest'}
                </button>
            </div>
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