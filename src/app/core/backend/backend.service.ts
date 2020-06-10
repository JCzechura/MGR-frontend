import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/enviroment";
import {AuthData, UserData} from "../../login/login.model";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MonoTypeOperatorFunction, Observable} from "rxjs";

const HTTP_STATUS = {
    INTERNAL_SERVER_ERROR: 500,
};

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    private readonly backendUrl = environment.backendUrl;
    private readonly authUrl = environment.authUrl;

    constructor(private readonly http: HttpClient,
                private readonly snackBar: MatSnackBar) {
    }

    signIn(userData: UserData) {
        return this.http.post(this.authUrl, userData, this.httpOptions)
            .pipe(this.handleGenericErrors<AuthData>());
    }

    post<T>(...[url, ...restOfParams]: Parameters<HttpClient['post']>): Observable<T> {
        return this.http.post<T>(this.backendUrl + url, ...restOfParams)
            .pipe(this.handleGenericErrors<T>());
    }

    get<T>(...[url, ...restOfParams]: Parameters<HttpClient['get']>): Observable<T> {
        return this.http.get<T>(this.backendUrl + url, ...restOfParams)
            .pipe(this.handleGenericErrors<T>());
    }

    private handleGenericErrors<T>(): MonoTypeOperatorFunction<T> {
        return catchError<T, never>(((err: HttpErrorResponse) => {
            if (err.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                this.showInternalServerErrorSnackBar(err.message, err.error);
            }
            throw err;
        }));
    }

    private showInternalServerErrorSnackBar(message: string, error: string) {
        const msg = message + ': ' + error;
        this.snackBar.open("Wewnetrzny błąd serwera - " + msg);
    }
}

