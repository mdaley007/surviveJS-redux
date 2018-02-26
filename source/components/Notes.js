// modules
import React from 'react'
// components
import Editable from './Editable'
import Note from './Note'

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
/*
onMove={({sourceId, targetId}) => console.log('source: ${sourceId}, target: ${targetId}')}*/
