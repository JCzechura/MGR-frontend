import {jwtConfig} from "../environments/jwt-config";

export function tokenGetter() {
    return localStorage.getItem(jwtConfig.localStorageTokenKey);
}