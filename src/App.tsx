import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import { observer } from 'mobx-react';
import userStore from './store/store';

import Header from './components/Header/Header';
import Center from './components/Center/Center';
import MainPage from './pages/MainPage/MainPage';
import NewsPage from './pages/NewsPage/NewsPage';



const App = (() => {
  return (
    <Box>
      <BrowserRouter>
        <Header/>
        <Center>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </Center>
      </BrowserRouter>
    </Box>
  );
});

export default App;
