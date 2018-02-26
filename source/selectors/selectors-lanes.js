// modules
//import { createSelector } from 'reselect'

const getLaneIds = (state) => state.getIn(['lanes', 'ids'])
const getLaneById = (state, laneId) => state.getIn(['lanes', 'entities', laneId])

export default {
    getLaneIds,
    getLaneById,
}
