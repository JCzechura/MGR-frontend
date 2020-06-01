import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  clear(): void { 
    localStorage.clear();
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }
  setLogin(login: string): void {
    localStorage.setItem(login, login);
  }
  setEnableAsDispatcher(enable: string): void {
    localStorage.setItem("enableAsDispatcher", enable);
  }
  setEnableAsDriver(enable: string): void {
    localStorage.setItem("enableAsDriver", enable);
  }
  isLoggedAsDispatcher() {
    return localStorage.getItem('token') != null && localStorage.getItem("role").match('^driver&dispatcher|dispatcher$');
  }
  isLoggedAsDriver() {
    return localStorage.getItem('token') != null && localStorage.getItem("enableAsDriver") != null;
  }
}