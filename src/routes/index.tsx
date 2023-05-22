import React from 'react';

import { Route, Routes } from "react-router-dom";
import Home from '../pages/home/home';
import Times from '../pages/times/teams';

const RoutesConfig: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/times" element={<Times />} />
  </Routes>
);

export default RoutesConfig;