import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../authorization/auth.service";


@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate() {
    if (!this.authService.isLogged()) {
      return true;
    }
    this.router.navigateByUrl('/home')
      .catch(error => console.log('Error during navigation to /cases', error));
    return false;
  }
}
