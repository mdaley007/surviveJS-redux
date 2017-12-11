// modules
import   React    from 'react'
import { render } from 'react-dom'

// style
require('./main.css')

// local storage
import alt from './library/alt'
import storage from './library/storage'
import persist from './library/persist'
persist(alt, storage, 'root')

// components
import App from './components/App'

// render App
render(
    <App />,
    document.getElementById('root')
)
