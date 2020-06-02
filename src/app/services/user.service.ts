import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {urlList} from "../../environments/url-list";
import {UserDetails} from "../models/user-details.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService) {
  }

  getCurrentUser() {
    return this.backendService.get<UserDetails>(urlList.currentUserGET, {});
  }
}
