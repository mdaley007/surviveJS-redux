// import modules
import { combineReducers } from 'redux-immutable'

// import reducers
import lanes from './reducer-lanes'
import notes from './reducer-notes'

// combine reducers
const rootReducer = combineReducers({
    lanes,
    notes,
})

// export reducers
export default rootReducer
