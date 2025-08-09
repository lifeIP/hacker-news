import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import Header from './components/Header/Header';
import NewsCard from './components/NewsCard/NewsCard';
import Center from './components/Center/Center';

function App() {

  function onPageSelected(pageIndex: number) {
    console.log("Выбрана страница с индексом: %d", pageIndex);
  }


  return (
    <Box>
      <Header onPageSelected={onPageSelected} />
      <Center>
        <Box display={"flex"}>
          <NewsCard
            title={"Название"}
            rating={3.28}
            author={"Artem"}
            publishedAt={"12 min"}
          />
          <NewsCard
            title={"Название"}
            rating={3.28}
            author={"Artem"}
            publishedAt={"12 min"}
          />
        </Box>

      </Center>
    </Box>
  );
}

export default App;
