import {Injectable} from '@angular/core';
import {BackendService} from "../../../core/backend/backend.service";
import {urlList} from "../../../../environments/url-list";
import {pluck} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    constructor(private backendService: BackendService) {
    }

    updatePassword(passwordObject: any) {
        this.backendService.post<{ status: string }>(urlList.updatePasswordPOST, passwordObject)
            .pipe(pluck('status'))
            .subscribe(value => {
                if (value === 'OK') {
                  alert('Hasło pomyślnie zmienione');
                }
                else {
                  alert('Zmiana hasła nie powiodła się');
                }
            });
    }
}
