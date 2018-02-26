// modules
import Immutable, { Map } from 'immutable'
// constants
import actionTypes from '../../constants/actionTypes'

const initialState = Immutable.fromJS({
    entities: {},
    ids: [],
})

const laneReducer = (state=initialState, action) => {

    switch (action.type) {

        case actionTypes.CREATE_LANE: {
            const newLane = action.payload
            const laneId  = newLane.get('id')

            const newEntities = state
                .get('entities')
                .set(laneId, newLane)
            const newIds = state
                .get('ids')
                .push(laneId)
            return Map.of(
                'entities', newEntities,
                'ids', newIds,
            )
        }

        case actionTypes.UPDATE_LANE: {
            const laneId  = action.payload.id
            const newName = action.payload.name

            return state.setIn(
                ['entities', laneId, 'name'],
                newName,
            )
        }

        case actionTypes.DELETE_LANE: {
            const laneId = action.payload.id

            const newEntities = state
                .get('entities')
                .delete(laneId)
            const newIds = state
                .get('ids')
                .filter(value => value !== laneId)
            return Map.of(
                'entities', newEntities,
                'ids', newIds,
            )
        }

        case actionTypes.ATTACH_NOTE: {
            const laneId = action.payload.laneId
            const noteId = action.payload.noteId

            // find sourceLane (undefined if new note)
            let newState
            const sourceLane = state
                .get('entities')
                .find(value => value.get('notes').contains(noteId))
            // case = mouse drag => remove noteId from sourceLane
            if (sourceLane) {
                const sourceLaneId = sourceLane.get('id')
                newState = state.updateIn(
                    ['entities', sourceLaneId, 'notes'],
                    array => array.filter(id => id !== noteId)
                )
            // case = new note => nothing to remove
            } else {
                newState = state
            }

            // push new noteId in laneId
            return newState.updateIn(
                ['entities', laneId, 'notes'],
                array => array.push(noteId)
            )
        }

        case actionTypes.DETACH_NOTE: {
            const laneId = action.payload.laneId
            const noteId = action.payload.noteId

            return state.updateIn(
                ['entities', laneId, 'notes'],
                array => array.filter(id => id !== noteId)
            )
        }

        case actionTypes.MOVE_NOTE: {
            const sourceId = action.payload.sourceId
            const targetId = action.payload.targetId

            const sourceLane = state
                .get('entities')
                .find(value => value.get('notes').contains(sourceId))
                .get('id')
            const targetLane = state
                .get('entities')
                .find(value => value.get('notes').contains(targetId))
                .get('id')
            const sourceNoteIndex = state
                .getIn(['entities', sourceLane, 'notes'])
                .indexOf(sourceId)
            const targetNoteIndex = state
                .getIn(['entities', targetLane, 'notes'])
                .indexOf(targetId)


            return state
                // remove note from sourceLane
                .updateIn(
                    ['entities', sourceLane, 'notes'],
                    array => array.splice(sourceNoteIndex, 1)
                )
                // insert note in targetLane
                .updateIn(
                    ['entities', targetLane, 'notes'],
                    array => array.splice(targetNoteIndex, 0, sourceId)
                )
        }

        default:
            return state

    } // switch
}

export default laneReducer
