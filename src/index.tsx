import 'bootstrap/scss/bootstrap-reboot.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'


if (process.env.NODE_ENV === 'development') {
    localStorage.clear()
}


ReactDOM.render(
    <App/>,
    document.getElementById('react-root')
)
