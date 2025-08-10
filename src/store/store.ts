import { makeAutoObservable } from 'mobx';

class AppStore {
  pageId = 0;
  newsId = 0;

  constructor() {
    makeAutoObservable(this); // Преобразуем объект в Observable
  }

  goToPage(index: number){
    this.pageId = index;
  }
  setNewsId(id: number){
    this.newsId = id;
  }
}

export default new AppStore(); // Экспортируем экземпляр класса