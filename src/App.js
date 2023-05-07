import React, { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import Main from './pages/Main';
import Create from './pages/Create'
import Edit from './pages/Edit'
import NotFound from './pages/NotFound'
import View from './pages/View';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading === true) {
    return (
      <Box style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <CircularProgress color="secondary" size={100} />
      </Box>
    )
  } else {
    return (
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='dashboard' element={<Main />} />
        <Route path='create' element={<Create />} />
        <Route path='view' element={<View />} />
        <Route path='edit' element={<Edit />} />
        <Route path='error404' element={<NotFound />} />
      </Routes>
    );
  }
}

export default App;
