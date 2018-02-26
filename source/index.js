// modules
import   React      from 'react'
import { render }   from 'react-dom'
import { Provider } from 'react-redux'
// store
import Store from './store'
// components
import App from './components/App'
// style
require('./main.css')

// render App
render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
