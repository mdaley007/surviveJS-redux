// modules
import Immutable, { Map } from 'immutable'
// constants
import actionTypes from '../constants/actionTypes'

const initialState = Immutable.fromJS({
    entities: {},
    ids: null,
})

const noteReducer = (state=initialState, action) => {

    switch (action.type) {

        case actionTypes.CREATE_NOTE: {
            const newNote = Immutable.fromJS(action.payload)
            const noteId  = newNote.get('id')

            const newEntities = state
                .get('entities')
                .set(noteId, newNote)
            return Map.of(
                'entities', newEntities,
                'ids', null,
            )
        }

        case actionTypes.UPDATE_NOTE: {
            const noteId  = action.payload.id
            const newTask = action.payload.task

            return state.setIn(
                ['entities', noteId, 'task'],
                newTask,
            )
        }

        case actionTypes.DELETE_NOTE: {
            const noteId = action.payload.id

            const newEntities = state
                .get('entities')
                .delete(noteId)
            return Map.of(
                'entities', newEntities,
                'ids', null,
            )
        }

        case actionTypes.DELETE_LANE: {
            const notes = action.payload.notes

            let newState = state
            notes.map(noteId => {
                newState = newState.deleteIn(['entities', noteId])
            })
            return newState
        }

        default:
            return state

    } // switch
}

export default noteReducer
