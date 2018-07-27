import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Router from './Router'

import {createStore} from 'redux'
import Reducers from './Redux'
import {Provider} from 'react-redux'

let store = createStore(Reducers)
ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById('root'))
