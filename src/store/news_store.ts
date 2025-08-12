import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import settings from '../settings.json';

interface NewsItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

class NewsStore {
  currentId: number = 0;

  listOfNews: number[] = [];
  listOfNewsWithInfo: NewsItem[] = [];
  lastUpdate = 0;

  constructor() {
    makeAutoObservable(this); // Преобразуем объект в Observable
  }

  setListOfNews(listOfNews: []) {
    this.listOfNews = listOfNews;
  }
  clearNews() {
    this.listOfNews = []
    this.listOfNewsWithInfo = []
  }

  setCurrentId(currentId: number) {
    this.currentId = currentId;
  }

  addNewNews({
    by, descendants, id, kids, score, time, title, type, url
  }: NewsItem) {
    this.listOfNewsWithInfo.push({ by, descendants, id, kids, score, time, title, type, url });
  }

  getItemById(targetId: number) {
    return this.listOfNewsWithInfo.find(item => item.id === targetId);
  }
}

export default new NewsStore(); // Экспортируем экземпляр класса