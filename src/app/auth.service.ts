import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserData } from './userData';




@Injectable({ providedIn: 'root' })
export class AuthService {

  private authUrl = 'http://localhost:8089/auth/token';  // URL to web api
  private isUserIncorrect = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET hero by id. Will 404 if id not found */
  getToken(userData: UserData ) {
      return this.http.post(this.authUrl, userData, this.httpOptions).pipe(
        catchError(this.handleError<String>('getToken', ""))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.isUserIncorrect = true;
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  setUserIncorrect(state: boolean) {
    this.isUserIncorrect = state;
  }

  getUserIncorrect() {
    return this.isUserIncorrect;
  }
}