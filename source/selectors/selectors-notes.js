// modules
import { Immutable } from 'immutable'
//import { createSelector } from 'reselect'

const getNoteById = (state, noteId) => state.getIn(['notes', 'entities', noteId])

export default {
    getNoteById,
}
