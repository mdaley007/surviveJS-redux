// modules
import React from 'react'

// components
import Editable from './Editable'
import Note from './Note'

// flux
import LaneActions from '../actions/LaneActions'

export default ({notes, onValueClick, onEdit, onDelete}) => {
    return (
        <ul className='notes'>
            {notes.map(note =>
                <Note
                    className='note'
                    id={note.id}
                    key={note.id}
                    editing={note.editing}
                    onMove={LaneActions.move}
                >
                    <Editable
                        editing={note.editing}
                        value={note.task}
                        onValueClick={onValueClick.bind(null, note.id)}
                        onEdit={onEdit.bind(null, note.id)}
                        onDelete={onDelete.bind(null, note.id)}
                    />
                </Note>
            )}
        </ul>
    )
}
