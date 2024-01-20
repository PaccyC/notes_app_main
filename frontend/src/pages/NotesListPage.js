import React, { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import { Link } from 'react-router-dom';

const NotesListPage = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/notes/");
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        getNotes();
    }, []);

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9872;</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>

            <div className='notes-list'>
                {notes.map((note) => (
                    <ListItem key={note.id} note={note} />
                ))}
            </div>

            <Link to="/note/new" className='floating-button'>
                <button>+</button>
            </Link>
        </div>
    );
};

export default NotesListPage;
