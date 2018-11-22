import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Router from './Router'

import {createStore, applyMiddleware} from 'redux'
import Reducers from './Redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

let store = createStore(Reducers, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById('root'))
