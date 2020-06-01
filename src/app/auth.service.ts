import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData, UserData} from './login.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BackendService} from "./services/backend.service";
import {jwtConfig} from "../environments/jwt-config";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
      private http: HttpClient,
      private backendService: BackendService,
      private jwtHelper: JwtHelperService) {
  }

  signIn(userData: UserData): Promise<AuthData> {
    this.setLogin(userData.login);
    return this.backendService
        .signIn(userData)
        .toPromise();
  }

  setToken(token: string) {
    localStorage.setItem(jwtConfig.localStorageTokenKey, token);
  }

  setLogin(login: string) {
    localStorage.setItem('login', login);
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  storeUserAuthData(token: string) {
    const login = this.jwtHelper.decodeToken(token).sub;
    const role = this.jwtHelper.decodeToken(token).enable;
    this.setLogin(login);
    this.setRole(role);
    this.setToken(token);
  }

  isLogged(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  signOut() {
    localStorage.removeItem(jwtConfig.localStorageTokenKey);
  }
}