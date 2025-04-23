import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import Routes from './routes/Routes'

export default function App(){
    localStorage.setItem('loggedIn', 'false')

    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}

