import { makeAutoObservable } from 'mobx';

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