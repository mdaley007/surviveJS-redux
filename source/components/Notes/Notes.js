// modules
import React from 'react'

// style
import Style from './Notes.css'

// components
import Editable from '../Editable'

// containers
import Note from '../../containers/Note'

export default ({notes, onDelete, onMove}) => {
    return (
        <ul className='notes'>
            {notes.map(noteId =>
                <li
                    key={noteId}
                >

                    <Note
                        styleClass='note'
                        noteId={noteId}
                        onDelete={onDelete.bind(null, noteId)}
                        onMove={onMove}
                   />

                </li>
            )}
        </ul>
    )
}
