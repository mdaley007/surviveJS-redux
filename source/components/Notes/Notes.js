// modules
import React from 'react'
// components
import Editable from '../Editable'
// containers
import Note from '../../containers/Note'

export default ({notes, onDelete, onMove}) => {
    return (
        <ul>
            {notes.map(noteId =>
                <Note
                    key={noteId}
                    noteId={noteId}
                    onDelete={onDelete.bind(null, noteId)}
                    onMove={onMove}
               />
            )}
        </ul>
    )
}
