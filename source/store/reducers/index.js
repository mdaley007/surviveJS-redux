// import modules
import { combineReducers } from 'redux-immutable'

// import reducers
import lanes from '../../containers/Lane/lane-reducer'
import notes from '../../containers/Note/note-reducer'

// combine reducers
const rootReducer = combineReducers({
    lanes,
    notes,
})

// export reducers
export default rootReducer
