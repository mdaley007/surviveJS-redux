var environment = 'development'

// import modules
import { applyMiddleware,
         createStore }            from 'redux'
import   logger                   from 'redux-logger'
import { persistStore,
         persistCombineReducers } from 'redux-persist'
import   storage                  from 'redux-persist/es/storage'
//import { AsyncStorage } from 'react-native'

// import reducers
const reducerConfig = {
    key: 'root',
    storage,
}
import reducers from './reducers'
const reducer = persistCombineReducers(reducerConfig, reducers)

// define middleware
var middleware
if (environment == 'production') {
    middleware = applyMiddleware()
} else {  // environment == 'development'
    middleware = applyMiddleware(logger)
}
// create store
let store     = createStore(reducers, middleware)
//let persistor = persistStore(store)

// export store
export default store //{persistor, store}
