import React from "react";
import { Routes as RoutesWrapper, Route } from "react-router-dom"

import Home from "../pages/Home";
import Login from "../pages/Login";
import Create from "../pages/Create";
import Join from "../pages/Join";
import Register from "../pages/Register";
import MultiplayerGameBoard from "../pages/MultiplayerGameBoard";
import SinglePlayerGameBoard from "../pages/SinglePlayerGameBoard";
import ChangePassword from "../pages/ChangePassword";
import NotFoundPage from "../pages/NotFoundPage";

const Routes = () => {
    return(
        <RoutesWrapper>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/join' element={<Join />} />
            <Route path='/register' element={<Register />} />
            <Route path='/Mgame/:roomName' element={<MultiplayerGameBoard />} />
            <Route path='/Sgame' element={<SinglePlayerGameBoard />} />
            <Route path="/password"  element={<ChangePassword />} />

            <Route path="*" element={<NotFoundPage />} />
        </RoutesWrapper>
    )
}

export default Routes