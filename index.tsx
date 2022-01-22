import Favorites from "pages/Favorites";
import FirstPage from "pages/FirstPage";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<FirstPage showDetails={false} />} />
            <Route path="/:url" element={<FirstPage showDetails={true} />} />
            <Route path="/favorites" element={<Favorites showDetails={false} />} />
            <Route path="/favorites/:url" element={<Favorites showDetails={true} />} />
        </Routes>
    </BrowserRouter>
    , document.getElementById('root'));