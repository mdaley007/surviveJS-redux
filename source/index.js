// modules
import   React      from 'react'
import { render }   from 'react-dom'
import { Provider } from 'react-redux'

// import store
import Store from './store'

// style
require('./main.css')

// local storage
import alt          from './library/alt'
import persist      from './library/persist'
import localStorage from './library/localStorage'
persist(alt, localStorage, 'store')

// components
import App from './components/App'

// render App
render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
