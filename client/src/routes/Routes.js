import React from "react";
import { Routes as RoutesWrapper, Route } from "react-router-dom"

import Home from "../pages/Home";
import Login from "../pages/Login";
import Create from "../pages/Create";
import Join from "../pages/Join";
import Register from "../pages/Register";
import GameBoard from "../pages/GameBoard";

const Routes = () => {
    return(
        <RoutesWrapper>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/join' element={<Join />} />
            <Route path='/register' element={<Register />} />
            <Route path='/game' element={<GameBoard />} />
            
        </RoutesWrapper>
    )
}

export default Routes