// import modules
import { combineReducers } from 'redux'

// import reducers
import lanes from './reducer-lanes'
import notes  from './reducer-notes'

// combine reducers
const allReducers = combineReducers({
    lanes,
    notes,
})

// export reducers
export default allReducers
