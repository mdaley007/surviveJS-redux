// modules
import uuid from 'uuid'
// constants
import actionTypes from '../constants/actionTypes'

// create note
const createNote = () => {
    return {
        type: actionTypes.CREATE_NOTE,
        payload: {
            id:    uuid.v4(),
            task: 'New Task',
        },
    }
}

// update task
const updateNote = (id, task) => {
    return {
        type: actionTypes.UPDATE_NOTE,
        payload: {
            id,
            task,
        },
    }
}

// delete note
const deleteNote = (id) => {
    return {
        type: actionTypes.DELETE_NOTE,
        payload: {
            id,
        }
    }
}

// export
export default {
    createNote,
    updateNote,
    deleteNote,
}
