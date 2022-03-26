import React from "react";
import Panel from "./views/Panel";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
