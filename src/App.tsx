import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import Header from './components/Header/Header';

function App() {
  
  function onPageSelected(pageIndex: number){
    console.log("Выбрана страница с индексом: %d", pageIndex);
  }


  return (
    <Box>
      <Header onPageSelected={onPageSelected}/>
    </Box>
  );
}

export default App;
