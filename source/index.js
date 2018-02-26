// modules
import   React      from 'react'
import { render }   from 'react-dom'
import { Provider } from 'react-redux'
// store
import store from './store'
// components
import App from './containers/App'
// style
require('./main.css')

// render App
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
