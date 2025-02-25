import React from "react";
import { Routes as RoutesWrapper, Route } from "react-router-dom"

import Home from "../pages/Home";
import Login from "../pages/Login";

const Routes = () => {
    return(
        <RoutesWrapper>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </RoutesWrapper>
    )
}

export default Routes