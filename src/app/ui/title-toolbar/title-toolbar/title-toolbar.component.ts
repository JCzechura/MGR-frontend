import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../core/authorization/auth.service";


@Component({
    selector: 'app-title-toolbar',
    templateUrl: './title-toolbar.component.html',
    styleUrls: ['./title-toolbar.component.scss']
})
export class TitleToolbarComponent {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    signOut(): void {
        this.authService.signOut();
        this.router.navigateByUrl('/login');
    }
}
