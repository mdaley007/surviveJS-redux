// modules
import Immutable from 'immutable'
import uuid      from 'uuid'
// constants
import actionTypes from '../../constants/actionTypes'

// create lane
const createLane = (name='New Lane') => {
    return {
        type: actionTypes.CREATE_LANE,
        payload: Immutable.fromJS({
            id:    uuid.v4(),
            name:  name,
            notes: [],
        })
    }
}

// update name
const updateLane = (id, name) => {
    return {
        type: actionTypes.UPDATE_LANE,
        payload: {
            id,
            name,
        },
    }
}

// delete lane
const deleteLane = (lane) => {
    return {
        type: actionTypes.DELETE_LANE,
        payload: {
            id:    lane.get('id'),
            notes: lane.get('notes'),
        },
    }
}

// update lane's notes
const attachNote = (laneId, noteId) => {
    return {
        type: actionTypes.ATTACH_NOTE,
        payload: {
            laneId,
            noteId,
        },
    }
}

// update lane's notes
const detachNote = (laneId, noteId) => {
    return {
        type: actionTypes.DETACH_NOTE,
        payload: {
            laneId,
            noteId,
        },
    }
}

// update lanes notes
const moveNote = (sourceId, targetId) => {
    return {
        type: actionTypes.MOVE_NOTE,
        payload: {
            sourceId,
            targetId,
        },
    }
}

// export
export default {
    createLane,
    updateLane,
    deleteLane,
    attachNote,
    detachNote,
    moveNote,
}
