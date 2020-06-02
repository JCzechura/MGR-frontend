import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    return this.checkLogin();
  }

  canActivateChild() {
    return this.checkLogin();
  }

  canLoad() {
    return this.checkLogin();
  }

  private checkLogin() {
    if (this.authService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl('/login')
      .catch(error => console.error('Error during navigation to /login', error));
    return false;
  }
}
