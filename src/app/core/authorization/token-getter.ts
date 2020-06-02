import {jwtConfig} from "../../../environments/jwt-config";

export function tokenGetter() {
    console.log('pobieram');
    return localStorage.getItem(jwtConfig.localStorageTokenKey);
}