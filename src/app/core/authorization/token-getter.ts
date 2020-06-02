import {jwtConfig} from "../../../environments/jwt-config";

export function tokenGetter() {
    return 'Bearer '+ localStorage.getItem(jwtConfig.localStorageTokenKey);
}