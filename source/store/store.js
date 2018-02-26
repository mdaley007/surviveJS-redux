// should depend on actual environment variable
var environment = 'development'

// modules
import   Immutable             from 'immutable'
import { applyMiddleware,
         createStore }         from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import   logger                from 'redux-logger'

// rootReducer
import rootReducer from './reducers'

// get initial state
const persistedStateKey = 'surviveJS'
const initialState = localStorage.getItem(persistedStateKey)
    ? Immutable.fromJS(JSON.parse(localStorage.getItem(persistedStateKey)))
    : undefined

// middleware
let middleware
const middlewareList = []
if (environment == 'production') {
    middleware = applyMiddleware( ...middlewareList )
} else {  // environment == 'development'
    middlewareList.push(logger)
    middleware = composeWithDevTools(applyMiddleware( ...middlewareList ))
}

// create store
const store = createStore(rootReducer, initialState, middleware)

// update persisted state
store.subscribe(() => {
    const state = store.getState().toJS()
    localStorage.setItem(persistedStateKey, JSON.stringify(state))
})

// export store
export default store
