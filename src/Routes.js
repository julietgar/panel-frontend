import React from "react";
import Main from "./views/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
