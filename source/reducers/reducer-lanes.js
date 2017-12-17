// import modules
import _    from 'lodash'
import uuid from 'uuid'

const initialState = []

// export lane
const laneReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'CREATE':
            const newLane = {
                id: uuid.v4(),
                name: 'New Lane',
                notes: [],
            }
            //const newLanes = state.lanes.concat(newLane)
            //console.log(newLanes)
            return {
                ...state,

            }
        case 'UPDATE':
        return {
            ...state,
            id: laneId,
            editing: false,
        }
        case 'DELETE':
            return Object.assign(
                {},
                state,
                {

                },
            )
        case 'ATTACH_TO_LANE':
            return Object.assign(
                {},
                state,
                {

                },
            )
        case 'DETATCH_FROM_LANE':
            return Object.assign(
                {},
                state,
                {

                },
            )
        case 'MOVE':
            return Object.assign(
                {},
                state,
                {

                },
            )
        default:
            return state
    } // switch
}

export default laneReducer
