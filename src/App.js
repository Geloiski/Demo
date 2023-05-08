import React, { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import Main from './pages/Main';
import Create from './pages/Create'
import Edit from './pages/Edit'
import NotFound from './pages/NotFound'
import View from './pages/View';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' />} />
      <Route path='dashboard' element={<Main />} />
      <Route path='create' element={<Create />} />
      <Route path='view/:id/:name' element={<View />} />
      <Route path='edit/:id/:name' element={<Edit />} />
      <Route path='error404' element={<NotFound />} />
    </Routes>
  );
}

export default App;
