// modules
import   React      from 'react'
import { render }   from 'react-dom'
import { Provider } from 'react-redux'
// global style
require('./global.css')
// store
import store from './store'
// components
import App from './containers/App'

// render App
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
