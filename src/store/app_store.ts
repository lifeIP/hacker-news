import { makeAutoObservable } from 'mobx';
import { useLocation } from 'react-router-dom';

class AppStore {
  pageId = 0;

  constructor() {
    makeAutoObservable(this); // Преобразуем объект в Observable
  }

  goToPage(index: number){
    this.pageId = index;
  }
}

export default new AppStore(); // Экспортируем экземпляр класса