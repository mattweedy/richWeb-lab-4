import React, { useEffect, useState } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

// TODO: extra functions:
//       - swap css file to darkmode depending on time
//       - something else

const App = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const[weatherData, setWeatherData] = useState({});
    const [city, setCity] = useState("");

    const addNote = (noteText, noteColour) => {
        if (noteText.trim() !== "") {
            const newNote = { id: Date.now(), text: noteText, color: noteColour };
            setNotes([...notes, newNote]);
        }
    };

    const editNote = (noteText, noteColour) => {
        if (currentNote) { // if theres a note selected
            const editedText = window.prompt("edit note text/colour", currentNote.text); // prompt for new text
            if (editedText !== null) { // if the text isnt empty
                //update the note in the notes array
                setNotes(notes.map(note => note === currentNote ? {...note, text: editedText, color: noteColour} : note));
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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });

        console.log("Latitude is :", lat)
        console.log("Longitude is :", long)

        if (city) {
            const fetchData = async () => {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b2514be7b456d0f78a7485c408ec07e9`);
                const data = await response.json();
                setWeatherData(data);
            };
            fetchData();
        }
        
    }, [lat, long, city]);

    return (
        <div className="grid">
            <div id="notes">
                <h2 id="stored-notes-title">Stored notes</h2>
                <NoteList notes={notes} selectNote={selectNote} />
            </div>

            <div id="notes-new">
                <NoteForm addNote={addNote} editNote={editNote} deleteNote={deleteNote} currentNote={currentNote} setCurrentNote={setCurrentNote} />
            <div id="weather">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                {weatherData.name && <h2>{weatherData.name}</h2>}
                {weatherData.main && <h3>{Math.round(weatherData.main.temp - 273.15)}°C</h3>}
                {weatherData.main && <p>Feels like: {Math.round(weatherData.main.feels_like - 273.15)}°C</p>}
                {weatherData.weather && <p>{weatherData.weather[0].description}</p>}
            </div>
            </div>

        </div>
    );
}

export default App;